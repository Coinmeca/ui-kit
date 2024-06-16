'use client';
import { Sort } from 'lib/utils';
import type { LineData } from 'lightweight-charts';
import { HistogramData, createChart } from 'lightweight-charts';
import { Suspense, memo, useEffect, useRef, useState } from 'react';
import type { Volume } from './Candle';
import Style from './Chart.styled';

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
    fallback?: any;
    fit?: boolean;
}

export const Line = (props: Line) => {
    const up = props?.up || 'up';
    const down = props?.down || 'down';

    const theme = props?.color?.theme && props?.color?.theme === 'light' ? '0,0,0' : '255,255,255';
    const [color, setColor] = useState({
        default: props?.color?.default ? `rgb(${props?.color?.default})` : `rgb(${theme})`,
        up: props?.color?.up || '0,192,96',
        down: props?.color?.down || '255,0,64',
        theme: {
            strong: `rgba(${theme}, 0.6)`,
            semi: `rgba(${theme}, 0.45)`,
            medium: `rgba(${theme}, 0.3)`,
            regular: `rgba(${theme}, 0.15)`,
            light: `rgba(${theme}, 0.05)`,
        },
    });

    const key = {
        time: props?.field?.time || 'time',
        value: props?.field?.value || 'value',
        volume: props?.field?.volume || 'volume',
    };

    const [data, setData] = useState<any>([]);
    const [volume, setVolume] = useState<Volume[]>([]);
    const chartRef: any = useRef();

    useEffect(() => {
        globalThis.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
            const scheme = !theme && matches ? '0,0,0' : '255,255,255';
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
            const test = Sort(
                props?.data?.map((v: any) => {
                    return {
                        time: v?.time,
                        value: parseFloat(v[key?.value]?.toString() || '0'),
                    } as LineData;
                }),
                key?.time,
                props?.data && props?.data?.length > 0 && typeof (props?.data[0] as any)[key?.time] === 'number' ? 'number' : 'string',
                true,
            );
            console.log(test);
            setData(test);
        }
    }, [props?.data]);

    useEffect(() => {
        if (props?.volume && props?.volume?.length > 0) {
            const test = Sort(
                props?.volume?.map((v: any) => {
                    return {
                        time: v?.time,
                        value: parseFloat(v[key?.volume]?.toString() || '0'),
                        color: v?.type === up && color.up ? `rgba(${color.up}, 0.3)` : color.down ? `rgba(${color.down}, 0.3)` : `rgba(${color.default}, 0.3)`,
                        // color: v.type === up ? `rgb(${Root.Color(color.up)})` : `rgb(${Root.Color(color.down)})`,
                    } as Volume;
                }),
                key?.time,
                props?.volume && props?.volume?.length > 0 && typeof (props?.volume[0] as any)[key?.time] === 'number' ? 'number' : 'string',
                true,
            );
            console.log(test);
            setVolume(test);
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
                        color: 'transparent',
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
                        type: 'price',
                    },
                    // set as an overlay by setting a blank priceScaleId
                    priceScaleId: '',
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
            }

            if (volume) {
                const volumeSeries = chart.addHistogramSeries({
                    color: 'yellow',
                    priceFormat: {
                        type: 'volume',
                    },
                    priceScaleId: '', // set as an overlay by setting a blank priceScaleId
                    // set the positioning of the volume series
                });

                // volumeSeries.priceScale().applyOptions({
                //     scaleMargins: {
                //         top: 0.8, // highest point of the series will be 70% away from the top
                //         bottom: 0,
                //     },
                // });

                volumeSeries.setData(volume as HistogramData[]);
            }

            props?.fit
                ? chart.timeScale().fitContent()
                : chart.timeScale().applyOptions({
                    barSpacing: 10,
                });

            globalThis.addEventListener('resize', handleResize);

            return () => {
                globalThis.removeEventListener('resize', handleResize);
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

export default memo(Line);
