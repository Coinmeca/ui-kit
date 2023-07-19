"use client";
import { createChart } from "lightweight-charts";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Sort } from "lib/utils";
import { Root } from "lib/style";
import Style from "./Chart.styled";

export interface Candle {
    color?: {
        up: string;
        down: string;
    };
    price?: Price;
    volume?: Volume;
    up?: string;
    down?: string;
    fallback?: any;
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
    type: string;
}

export default function Candle(props: any) {
    const color = { up: props?.color?.up || "green", down: props?.color?.down || "red" };

    const [price, setPrice] = useState<any>([]);
    const [volume, setVolume] = useState<any>([]);

    const up = props?.up || "up";
    const down = props?.up || "down";

    useEffect(() => {
        if (props?.price && props?.price.length > 0) {
            setPrice(
                Sort(
                    props?.price.map((v: Price) => {
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
    }, [props?.price]);

    useEffect(() => {
        if (props?.volume && props?.volume.length > 0) {
            setVolume(
                Sort(
                    props?.volume.map((v: Volume) => {
                        return {
                            time: v.time,
                            value: v.value,
                            color: v.type === up ? "#00b060" : "#ff0040",
                            // color: v.type === up ? `rgb(${Root.Color(color.up)})` : `rgb(${Root.Color(color.down)})`,
                        };
                    }),
                    "time",
                    "number",
                    false
                )
            );
        }
    }, [props?.volume]);

    const chartRef: any = useRef();

    useEffect(() => {
        // const chart = createChart(document.getElementById('container'), );

        if (chartRef?.current) {
            const chart = createChart(chartRef?.current, {
                layout: {
                    background: {
                        color: "transparent",
                    },
                    fontSize: 10,
                    fontFamily: "'Montserrat', 'Noto Sans KR', sans-serif",
                    textColor: "rgba(255,255,255,0.6)",
                },
                grid: {
                    vertLines: { color: "rgba(255,255,255,0.05)" },
                    horzLines: { color: "rgba(255,255,255,0.05)" },
                },
                rightPriceScale: {
                    borderVisible: true,
                    borderColor: "rgba(255,255,255,0.15)",
                },
                timeScale: {
                    borderColor: "rgba(255,255,255,0.15)",
                },
                trackingMode: {},
                width: chartRef?.current?.clientWidth,
                height: chartRef?.current?.clientHeight,
            });

            const handleResize = () => {
                chart.applyOptions({
                    width: chartRef?.current?.clientWidth,
                    crosshair: {
                        // Change mode from default 'magnet' to 'normal'.
                        // Allows the crosshair to move freely without snapping to datapoints
                        mode: 0,

                        // Vertical crosshair line (showing Date in Label)
                        vertLine: {
                            width: 4,
                            color: "#C3BCDB44",
                            // style: LightweightCharts.LineStyle.Solid,
                            style: 0,
                            labelBackgroundColor: "#9B7DFF",
                        },

                        // Horizontal crosshair line (showing Price in Label)
                        horzLine: {
                            color: "#9B7DFF",
                            labelBackgroundColor: "#9B7DFF",
                        },
                    },
                });
            };

            const candleSeries = chart.addCandlestickSeries({
                upColor: "#00b060",
                downColor: "#ff0040",
                // upColor: `rgb(var(--${color.up}))`,
                // downColor: `rgb(var(--${color.down}))`,
                borderVisible: false,
                wickUpColor: "#00b060",
                wickDownColor: "#ff0040",
                // wickUpColor: `rgb(var(--${color.up}))`,
                // wickDownColor: `rgb(var(--${color.down}))`,
            });

            candleSeries.priceScale().applyOptions({
                scaleMargins: {
                    // positioning the price scale for the area series
                    top: 0.1,
                    bottom: volume ? 0.3 : 0,
                },
            });

            candleSeries.setData(price);

            if (volume) {
                const volumeSeries = chart.addHistogramSeries({
                    color: "",
                    priceFormat: {
                        type: "volume",
                    },
                    priceScaleId: "", // set as an overlay by setting a blank priceScaleId
                    // set the positioning of the volume series
                    // scaleMargins: {
                    //     top: 0.7, // highest point of the series will be 70% away from the top
                    //     bottom: 0
                    // }
                });
                volumeSeries.priceScale().applyOptions({
                    scaleMargins: {
                        top: 0.8, // highest point of the series will be 70% away from the top
                        bottom: 0,
                    },
                });
                volumeSeries.setData(volume);
            }

            if (props?.fit) {
                chart.timeScale().applyOptions({
                    barSpacing: 10,
                }); //timeScale().fitContent();
            }

            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
                chart.remove();
            };
        }
    }, [chartRef, price, volume]);

    return (
        <Suspense fallback={props?.fallback || <div>Loading...</div>}>
            <Style ref={chartRef} />
        </Suspense>
    );
}
