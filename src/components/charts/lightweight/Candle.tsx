"use client";
import React, { Suspense, memo, useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import type { CandlestickData, HistogramData } from "lightweight-charts";
import { Sort } from "lib/utils";
import Style from "./Chart.styled";

export interface Candle {
    color?: {
        up?: string;
        down?: string;
        theme?: string;
    };
    field?: {
        time?: string;
        value?: string;
    };
    price?: Price[];
    volume?: Volume[];
    up?: string;
    down?: string;
    fallback?: any;
    fit?: boolean;
}

export interface Price {
    time: number | string;
    open: number | string;
    high: number | string;
    low: number | string;
    close: number | string;
}

export interface Volume {
    time: number | string;
    value: number | string;
    type?: string;
}

export const Candle = (props: Candle) => {
    const up = props?.up || "up";
    const down = props?.down || "down";

    const theme = props?.color?.theme && props?.color?.theme === "light" ? "0,0,0" : "255,255,255";
    const [color, setColor] = useState({
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

    const [price, setPrice] = useState<Price[]>([]);
    const [volume, setVolume] = useState<Volume[]>([]);
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
        if (props?.price && props?.price?.length > 0) {
            setPrice(
                Sort(
                    props?.price?.map((v: Price) => {
                        return {
                            ...v,
                        };
                    }),
                    key?.time,
                    typeof props?.price[0]?.time === "number" ? "number" : "string",
                    true
                )
            );
        }
    }, [props?.price]);

    useEffect(() => {
        if (props?.volume && props?.volume?.length > 0) {
            setVolume(
                Sort(
                    props?.volume?.map((v: any) => {
                        return {
                            time: v[key?.time],
                            value: parseFloat(v[key?.value].toString()),
                            color: v?.type === up ? `rgba(${color.up}, 0.3)` : `rgba(${color.down}, 0.3)`,
                            // color: v.type === up ? `rgb(${Root.Color(color.up)})` : `rgb(${Root.Color(color.down)})`,
                        } as Volume;
                    }),
                    key?.time,
                    typeof props?.volume[0]?.time === "number" ? "number" : "string",
                    true
                )
            );
        }
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
            if (price) {
                const candleSeries = chart.addCandlestickSeries({
                    upColor: `rgb(${color.up})`,
                    downColor: `rgb(${color.down})`,
                    // upColor: `rgb(var(--${color.up}))`,
                    // downColor: `rgb(var(--${color.down}))`,
                    borderVisible: false,
                    wickUpColor: `rgb(${color.up})`,
                    wickDownColor: `rgb(${color.down})`,
                    // wickUpColor: `rgb(var(--${color.up}))`,
                    // wickDownColor: `rgb(var(--${color.down}))`,
                });
                candleSeries.priceScale().applyOptions({
                    scaleMargins: {
                        // positioning the price scale for the area series
                        top: 0.1,
                        bottom: volume ? 0.4 : 0,
                    },
                });
                candleSeries.setData(price as CandlestickData[]);
            }
            if (volume) {
                const volumeSeries = chart.addHistogramSeries({
                    color: "yellow",
                    priceFormat: {
                        type: "volume",
                    },
                    priceScaleId: "", // set as an overlay by setting a blank priceScaleId
                    // set the positioning of the volume series
                });
                volumeSeries.priceScale().applyOptions({
                    scaleMargins: {
                        top: 0.8, // highest point of the series will be 70% away from the top
                        bottom: 0,
                    },
                });
                volumeSeries.setData(volume as HistogramData[]);
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
    }, [chartRef, price, volume, color, color.up, color.down, props?.fit]);

    return (
        <Suspense fallback={props?.fallback || <div>Loading...</div>}>
            <Style ref={chartRef} />
        </Suspense>
    );
};

export default memo(Candle);
