"use client";
import { useTheme } from "hooks";
import { sort } from "lib/utils";
import type { LineData } from "lightweight-charts";
import { HistogramData, createChart } from "lightweight-charts";
import { Suspense, memo, useCallback, useEffect, useRef, useState } from "react";
import type { Volume } from "./Candle";
import Style from "./Chart.styled";
import { Root } from "lib/style";

type DataType = "price" | "volume" | "percent";

export interface Line {
    color?: {
        default?: string;
        up?: string;
        down?: string;
        theme?: string;
    };
    field?: {
        time?: string;
        value?: string;
        volume?: string;
    };
    data?: LineData[];
    volume?: Volume[];
    up?: string;
    down?: string;
    type?: DataType | { line?: DataType; histogram?: DataType };
    format?: Function | { line?: Function; histogram?: Function };
    unit?: string | { line?: string; histogram?: string };
    fallback?: any;
    style?: any;
    fit?: boolean;
}

export const Line = (props: Line) => {
    const up = props?.up || "up";
    const down = props?.down || "down";
    const { theme: detectedTheme } = useTheme();

    const theme = props?.color?.theme
        ? props?.color?.theme === "light"
            ? "0,0,0"
            : "255,255,255"
        : detectedTheme === "light"
        ? "0,0,0"
        : "255,255,255";

    const getColor = (color?: string, fallback?: string) => {
        if (!color || color === "") return fallback;
        // if (color?.includes(",")) {
        // const length = color.split(",")?.length;
        // return length === 3 ? `rgb(${color})` : `rgba(${color})`;
        // }
        return color !== Root.Color(color) ? Root.Color(color) : color;
    };

    const color = {
        default: getColor(props?.color?.default, theme),
        up: getColor(props?.color?.up, "0,192,96"),
        down: getColor(props?.color?.down, "255,0,64"),
        theme: {
            strong: `rgba(${theme}, 0.6)`,
            semi: `rgba(${theme}, 0.45)`,
            medium: `rgba(${theme}, 0.3)`,
            regular: `rgba(${theme}, 0.15)`,
            light: `rgba(${theme}, 0.05)`,
        },
    };
    const key = {
        time: props?.field?.time || "time",
        value: props?.field?.value || "value",
        volume: props?.field?.volume || "volume",
    };

    const [data, setData] = useState<any>([]);
    const [volume, setVolume] = useState<Volume[]>([]);
    const chartRef: any = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            createChart(chartRef?.current).applyOptions({
                width: chartRef?.current?.clientWidth,
                height: chartRef?.current?.clientHeight,
            });
        };
        chartRef?.current?.addEventListener("resize", handleResize);
        return () => chartRef?.current?.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (props?.data && props?.data?.length > 0)
            setData(
                sort(
                    props?.data?.map((v: any) => {
                        return {
                            time: v?.time,
                            value: parseFloat(v[key.value]?.toString() || "0"),
                        } as LineData;
                    }),
                    key.time,
                    props?.data && props?.data?.length > 0 && typeof (props?.data[0] as any)[key.time] === "number"
                        ? "number"
                        : "string",
                    true,
                ),
            );
    }, [props?.data]);

    useEffect(() => {
        if (props?.volume && props?.volume?.length > 0)
            setVolume(
                sort(
                    props?.volume?.map((v: any) => {
                        return {
                            time: v?.time,
                            value: parseFloat(v[key.volume]?.toString() || "0"),
                            color:
                                v?.type === up && color.up
                                    ? `rgba(${color.up}, 0.3)`
                                    : color.down
                                    ? `rgba(${color.down}, 0.3)`
                                    : `rgba(${color.default}, 0.3)`,
                            // color: v.type === up ? `rgb(${Root.Color(color.up)})` : `rgb(${Root.Color(color.down)})`,
                        } as Volume;
                    }),
                    key.time,
                    props?.volume && props?.volume?.length > 0 && typeof (props?.volume[0] as any)[key.time] === "number"
                        ? "number"
                        : "string",
                    true,
                ),
            );
    }, [props?.volume, up, down, color]);

    useEffect(() => {
        // const chart = createChart(document.getElementById('container'), );

        if (chartRef?.current) {
            const handleResize = () => {
                chart.applyOptions({
                    width: chartRef?.current?.clientWidth,
                    height: chartRef?.current?.clientHeight,
                });
            };

            const chart = createChart(chartRef?.current, {
                layout: {
                    background: {
                        color: "transparent",
                    },
                    fontSize: 10,
                    fontFamily: "'Montserrat', 'Noto Sans KR', sans-serif",
                    textColor: color.theme.strong,
                },
                grid: {
                    vertLines: { color: color.theme.light },
                    horzLines: { color: color.theme.light },
                },
                rightPriceScale: {
                    borderVisible: true,
                    borderColor: color.theme.regular,
                },
                timeScale: {
                    borderColor: color.theme.regular,
                },
                trackingMode: {},
                crosshair: {
                    // Change mode from default 'magnet' to 'normal'.
                    // Allows the crosshair to move freely without snapping to datapoints
                    mode: 0,

                    // Vertical crosshair line (showing Date in Label)
                    vertLine: {
                        width: 4,
                        color: color.theme.regular,
                        // style: LightweightCharts.LineStyle.Solid,
                        style: 0,
                        labelBackgroundColor: color.theme.medium,
                    },

                    // Horizontal crosshair line (showing Price in Label)
                    horzLine: {
                        color: color.theme.semi,
                        labelBackgroundColor: color.theme.medium,
                    },
                },
                width: chartRef?.current?.clientWidth,
                height: chartRef?.current?.clientHeight,
            });

            if (data) {
                const series = chart.addLineSeries({
                    color: `rgb(${color.default})`,
                    priceFormat: {
                        type:
                            (typeof props?.type === "string"
                                ? props?.type
                                : typeof props?.type === "object" &&
                                  typeof props?.type?.line === "string" &&
                                  props?.type?.line) || "volume",
                    },
                    // set as an overlay by setting a blank priceScaleId
                    // priceScaleId: "",
                    // set the positioning of the volume series
                });

                series.priceScale().applyOptions({
                    scaleMargins: {
                        // positioning the price scale for the area series
                        top: 0.1,
                        bottom: volume ? 0.4 : 0,
                    },
                });

                series.setData(data);
                if (
                    (typeof props?.unit === "string" && props?.unit !== "") ||
                    (typeof props?.unit === "object" && props?.unit?.line)
                )
                    series.applyOptions({
                        priceFormat: {
                            type: "custom",
                            formatter: (price: any) =>
                                (typeof props?.format === "function"
                                    ? props?.format(price)
                                    : typeof props?.format === "object" && typeof props?.format?.line === "function"
                                    ? props?.format?.line(price)
                                    : price
                                ).toString() + props?.unit,
                        },
                    });
            }

            if (volume) {
                const volumeSeries = chart.addHistogramSeries({
                    priceFormat: {
                        type:
                            (typeof props?.type === "string"
                                ? props?.type
                                : typeof props?.type === "object" &&
                                  typeof props?.type?.histogram === "string" &&
                                  props?.type?.histogram) || "volume",
                    },
                    // set as an overlay by setting a blank priceScaleId
                    // priceScaleId: "",
                    // set the positioning of the volume series
                });

                // volumeSeries.priceScale().applyOptions({
                //     scaleMargins: {
                //         top: 0.8, // highest point of the series will be 70% away from the top
                //         bottom: 0,
                //     },
                // });

                volumeSeries.setData(volume as HistogramData[]);
                if (typeof props?.unit === "object" && props?.unit?.histogram)
                    volumeSeries.applyOptions({
                        priceFormat: {
                            type: "custom",
                            formatter: (price: any) =>
                                (typeof props?.format === "object" && typeof props?.format?.histogram === "function"
                                    ? props?.format?.histogram(price)
                                    : price
                                ).toString() + props?.unit,
                        },
                    });
            }

            props?.fit
                ? chart.timeScale().fitContent()
                : chart.timeScale().applyOptions({
                      barSpacing: 10,
                  });

            return () => {
                chart.remove();
            };
        }
    }, [chartRef, data, color, up, down, props?.fit]);

    return (
        <Suspense fallback={props?.fallback || <div>Loading...</div>}>
            <Style ref={chartRef} style={props?.style} />
        </Suspense>
    );
};

export default memo(Line);
