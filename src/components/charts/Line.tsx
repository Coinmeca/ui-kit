"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import type { LineData } from "lightweight-charts";
import { Sort } from "lib/utils";
import Style from "./Chart.styled";

export interface Line {
    color?: {
        default?: string;
        theme?: string;
    };
    data?: LineData[];
    up?: string;
    down?: string;
    fallback?: any;
    fit?: boolean;
}

export default function Line(props: Line) {
    const up = props?.up || "up";
    const down = props?.down || "down";

    const theme = props?.color?.theme && props?.color?.theme === "light" ? "0,0,0" : "255,255,255";
    const [color, setColor] = useState({
        default: props?.color?.default || `rgb(${theme})`,
        theme: {
            strong: `rgba(${theme}, 0.6)`,
            semi: `rgba(${theme}, 0.45)`,
            medium: `rgba(${theme}, 0.3)`,
            regular: `rgba(${theme}, 0.15)`,
            light: `rgba(${theme}, 0.05)`,
        },
    });

    const [data, setData] = useState<any>([]);
    const chartRef: any = useRef();

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
            setData(
                Sort(
                    props?.data?.map((v: LineData) => {
                        return {
                            ...v,
                        };
                    }),
                    "time",
                    "number",
                    false
                )
            );
        }
    }, [props?.data]);

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
                    color: color.default,
                    priceFormat: {
                        type: "volume",
                    },
                    // set as an overlay by setting a blank priceScaleId
                    priceScaleId: "",
                    // set the positioning of the volume series
                });

                series.setData(data);
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
}
