"use client";
import { useTheme } from "hooks";
import { sort } from "lib/utils";
import { createChart } from "lightweight-charts";
import { Suspense, memo, useEffect, useMemo, useRef, useState } from "react";
import Style from "./Chart.styled";

type DataType = "price" | "volume" | "percent";

export interface Histogram {
    color?: {
        default?: string;
        up?: string;
        down?: string;
        theme?: string;
        threshold?: number;
    };
    field?: {
        time?: string;
        value?: string;
    };
    data?: Data[] | any[];
    up?: string;
    down?: string;
    unit?: string;
    type?: DataType;
    format?: Function;
    fallback?: any;
    style?: any;
    fit?: boolean;
}

export interface Data {
    value: number | string;
    time: number | string;
    type?: string;
}

export const Histogram = (props: Histogram) => {
    const chartRef: any = useRef(null);
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
    const color = useMemo(
        () => ({
            default: props?.color?.default?.includes(",")
                ? `rgb(${props?.color?.default})`
                : props?.color?.default || `rgb(${theme})`,
            up: props?.color?.up || "0,192,96",
            down: props?.color?.down || "255,0,64",
            theme: {
                strong: `rgba(${theme}, 0.6)`,
                semi: `rgba(${theme}, 0.45)`,
                medium: `rgba(${theme}, 0.3)`,
                regular: `rgba(${theme}, 0.15)`,
                light: `rgba(${theme}, 0.05)`,
            },
            threshold: props?.color?.threshold || 0,
        }),
        [props?.color, theme],
    );

    const key = {
        time: props?.field?.time || "time",
        value: props?.field?.value || "value",
    };

    const [data, setData] = useState<any>([]);

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
        if (props?.data && props?.data?.length > 0) {
            const data = sort(
                props?.data?.map(
                    (v: any) =>
                        ({
                            color:
                                v?.type &&
                                v?.type !== "" &&
                                props?.up &&
                                props?.up !== "" &&
                                props?.down &&
                                props?.down !== "" &&
                                `rgb(${
                                    color[
                                        (v?.type === up ? "up" : v?.type === down ? "down" : "theme") as "up" | "down" | "theme"
                                    ]
                                })`,
                            time: v[key.time],
                            value: parseFloat(v?.[key.value]?.toString() || "0"),
                        } as Data),
                ),
                key.time,
                typeof props?.data?.[0]?.[key.time] === "number" ? "number" : "string",
                true,
            );

            let lastColor = color.up; // Initialize with the default color

            setData(
                (!props?.up || props?.up !== "") &&
                    (!props?.down || props?.down !== "") &&
                    props?.color?.up &&
                    props?.color?.up !== "" &&
                    props?.color?.down &&
                    props?.color?.down !== ""
                    ? data?.map((v: any, i: number) => {
                          const previous = data[i - 1];
                          if (i === 0)
                              return {
                                  ...v,
                                  color: `rgb(${color.up})`,
                              };

                          const change = v.value - previous.value;
                          const threshold = previous.value * (color.threshold / 100);

                          const newColor =
                              change === 0
                                  ? lastColor
                                  : change > 0
                                  ? change > threshold
                                      ? color.up
                                      : lastColor
                                  : change < -threshold
                                  ? color.down
                                  : lastColor;

                          lastColor = newColor; // Update lastColor for the next iteration

                          return {
                              ...v,
                              color: `rgb(${newColor})`,
                          };
                      })
                    : data,
            );
        }
    }, [props?.data, color]);

    useEffect(() => {
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
                    timeVisible: true,
                    secondsVisible: true,
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
                const series = chart.addHistogramSeries({
                    // color: (props?.color?.up && props?.color?.down) ? color.up : color.default,
                    priceFormat: {
                        type: props?.type || "volume",
                    },
                    // set as an overlay by setting a blank priceScaleId
                    // priceScaleId: "",
                    // set the positioning of the volume series
                });

                series.setData(data);

                if (props?.unit && props?.unit !== "")
                    series.applyOptions({
                        priceFormat: {
                            type: "custom",
                            formatter: (price: any) =>
                                (typeof props?.format === "function" ? props?.format(price) : price).toString() + props?.unit,
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
    }, [chartRef, data, theme, color, up, down, props?.fit]);

    return (
        <Suspense fallback={props?.fallback || <div>Loading...</div>}>
            <Style ref={chartRef} style={props?.style} />
        </Suspense>
    );
};

export default memo(Histogram);
