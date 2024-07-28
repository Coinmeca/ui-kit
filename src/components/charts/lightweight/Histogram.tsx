"use client";
import { parseNumber, sort } from "lib/utils";
import { createChart } from "lightweight-charts";
import { Suspense, memo, useEffect, useRef, useState } from "react";
import Style from "./Chart.styled";

export interface Histogram {
    color?: {
        default?: string;
        up?: string;
        down?: string;
        theme?: string;
    };
    field?: {
        time?: string;
        value?: string;
    };
    data?: Data[] | any[];
    up?: string;
    down?: string;
    unit?: string;
    fallback?: any;
    fit?: boolean;
}

export interface Data {
    value: number | string;
    time: number | string;
    type?: string;
}

export const Histogram = (props: Histogram) => {
    const up = props?.up || "up";
    const down = props?.down || "down";

    const theme = props?.color?.theme && props?.color?.theme === "light" ? "0,0,0" : "255,255,255";
    const [color, setColor] = useState({
        default: props?.color?.default?.includes(",") ? `rgb(${props?.color?.default})` : props?.color?.default || `rgb(${theme})`,
        up: props?.color?.up || "0,192,96",
        down: props?.color?.down || "255,0,64",
        theme: {
            strong: `rgba(${theme}, 0.6)`,
            semi: `rgba(${theme}, 0.45)`,
            medium: `rgba(${theme}, 0.3)`,
            regular: `rgba(${theme}, 0.15)`,
            light: `rgba(${theme}, 0.05)`,
        },
    });

    const key = {
        time: props?.field?.time || "time",
        value: props?.field?.value || "value",
    };

    const [data, setData] = useState<any>([]);
    const chartRef: any = useRef();
    const getColor = (current: string | number, previous: string | number) => (parseNumber(current) > parseNumber(previous) ? color?.up : color?.down);

    useEffect(() => {
        globalThis.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ({ matches }) => {
            const scheme = !theme && matches ? "0,0,0" : "255,255,255";
            setColor((color) => {
                return {
                    ...color,
                    theme: {
                        strong: `rgba(${scheme}, 0.6)`,
                        semi: `rgba(${scheme}, 0.45)`,
                        medium: `rgba(${scheme}, 0.3)`,
                        regular: `rgba(${scheme}, 0.15)`,
                        light: `rgba(${scheme}, 0.05)`,
                    },
                };
            });
        });
    }, [props?.color, theme]);

    useEffect(() => {
        if (props?.data && props?.data?.length > 0) {
            const data = sort(
                props?.data?.map(
                    (v: any) =>
                        ({
                            ...(props?.up &&
                                props?.up !== "" &&
                                props?.down &&
                                props?.down !== "" &&
                                v?.type &&
                                v?.type !== "" &&
                                `rgb(${color[(v?.type === up ? "up" : v?.type === down ? "down" : "theme") as "up" | "down" | "theme"]})`),
                            time: v[key.time],
                            value: parseFloat(v?.[key.value]?.toString() || "0"),
                        } as Data),
                ),
                key.time,
                typeof props?.data?.[0]?.[key.time] === "number" ? "number" : "string",
                true,
            );

            setData(
                (!props?.up || props?.up === "") &&
                    (!props?.down || props?.down === "") &&
                    props?.color?.up &&
                    props?.color?.up !== "" &&
                    props?.color?.down &&
                    props?.color?.down !== ""
                    ? data?.map((v: any, i: number) => ({
                          ...v,
                          color: `rgb(${i === 0 ? color?.up : getColor(v[key.value], data[i - 1][key.value])})`,
                      }))
                    : data,
            );
        }
    }, [props?.data]);

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
                    color: props?.color?.up && props?.color?.down ? props?.color?.up : color.default,
                    priceFormat: {
                        type: "volume",
                    },
                    priceScaleId: "", // set as an overlay by setting a blank priceScaleId
                    // set the positioning of the volume series
                });

                if (props?.unit && props?.unit !== "")
                    series.applyOptions({
                        priceFormat: {
                            type: "custom",
                            formatter: (price: any) => {
                                return price + props?.unit;
                            },
                        },
                    });
            }

            props?.fit
                ? chart.timeScale().fitContent()
                : chart.timeScale().applyOptions({
                      barSpacing: 10,
                  });

            globalThis.addEventListener("resize", handleResize);

            return () => {
                globalThis.removeEventListener("resize", handleResize);
                chart.remove();
            };
        }
    }, [chartRef, data, color, up, down, props?.fit]);

    return (
        <Suspense fallback={props?.fallback || <div>Loading...</div>}>
            <Style ref={chartRef} />
        </Suspense>
    );
};

export default memo(Histogram);
