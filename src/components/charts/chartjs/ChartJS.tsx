"use client";
import { Chart } from "chart.js/auto";
import { Suspense, useEffect, useRef, useState } from "react";

export interface ChartJS {
    type: "bar" | "line" | "scatter" | "bubble" | "pie" | "doughnut" | "polarArea" | "radar";
    color?: {
        default?: string;
        theme?: string;
    };
    padding?: number[] | ""[];
    field?:
        | {
              time: string;
              value: string;
          }
        | string;
    data?: Data[];
    onHover?: Function;
    onLeave?: Function;
    fallback?: any;
}

export interface Data {
    value?: number | string;
    time?: string;
}

export default function ChartJS(props: ChartJS) {
    const chartRef: any = useRef(null);
    const [data, setData] = useState<any>();

    const key = {
        time: typeof props?.field === "object" ? props?.field.time : "time",
        value:
            typeof props?.field === "object" ? props?.field.value : typeof props?.field === "string" ? props?.field : "value",
    };

    const theme = props?.color?.theme && props?.color?.theme === "light" ? "0,0,0" : "255,255,255";
    const color = {
        default: props?.color?.default ? `rgb(${props?.color?.default})` : `rgb(${theme})`,
        theme: {
            strong: `rgba(${theme}, 0.6)`,
            semi: `rgba(${theme}, 0.45)`,
            medium: `rgba(${theme}, 0.3)`,
            regular: `rgba(${theme}, 0.15)`,
            light: `rgba(${theme}, 0.05)`,
        },
    };

    const initial = 8;
    const padding = {
        top: props?.padding && (typeof props?.padding[0] === "number" ? props?.padding[0] : initial),
        right:
            props?.padding &&
            (props?.padding?.length === 1
                ? typeof props?.padding[0] === "number"
                    ? props?.padding[0]
                    : initial
                : props?.padding?.length > 1 && typeof props?.padding[1] === "number"
                ? props?.padding[1]
                : initial),
        bottom:
            props?.padding &&
            (props?.padding?.length === 1
                ? typeof props?.padding[0] === "number"
                    ? props?.padding[0]
                    : initial
                : props?.padding?.length > 2 && typeof props?.padding[2] === "number"
                ? props?.padding[2]
                : initial),
        left:
            props?.padding &&
            (props?.padding?.length === 1
                ? typeof props?.padding[0] === "number"
                    ? props?.padding[0]
                    : initial
                : props?.padding?.length > 3 && typeof props?.padding[3] === "number"
                ? props?.padding[3]
                : props?.padding?.length > 1 && typeof props?.padding[1] === "number"
                ? props?.padding[1]
                : initial),
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding,
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
                beginAtZero: true,
            },
        },
        interaction: {
            // mode: 'nearest',
            // position: 'nearest',
            includeInvisible: true,
            intersect: false,
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
            },
            tooltip: {
                enabled: true,
                padding: 0,
                borderColor: "transparent",
                backgroundColor: "transparent",
                callbacks: {
                    // labelPointStyle: (context) => {
                    //     return {
                    //         pointStyle: 'triangle',
                    //         rotation: 0
                    //     };
                    // },
                    label: (value: any) => {
                        if (typeof props?.onHover === "function") props?.onHover(value);
                        return "";
                    },
                    title: () => {
                        return "";
                    },
                },
            },
        },
    };

    useEffect(() => {
        if (props?.data && props?.data?.length > 0) {
            setData({
                labels: props?.data?.map((data: any) => data?.[key?.time]),
                datasets: [
                    {
                        data: props?.data?.map((data: any) => data?.[key?.value]),
                        borderColor: color.theme.medium,
                        pointBorderColor: "transparent",
                        pointBackgroundColor: color.theme.strong,
                        pointHoverBackgroundColor: `rgb(${theme})`,
                        pointRadius: 2,
                        pointHoverRadius: 4,
                        ...(props?.type !== "line" && { backgroundColor: color.theme.regular }),
                        ...(props?.type === "bar" && { hoverBackgroundColor: color.theme.strong }),
                    },
                ],
            });
        }
    }, [props?.data]);

    useEffect(() => {
        if (chartRef?.current) {
            const chart = new Chart(chartRef?.current?.getContext("2d"), {
                type: props?.type,
                data,
                options,
            });
            chart.resize();
            chart.canvas?.addEventListener("resize", () => chart.resize());
            chart.canvas?.addEventListener("mouseout", (e: any) => {
                const meta = chart.getDatasetMeta(0); // Assuming you're working with the first dataset
                const last = meta.data.length - 1; // Index of the last data point

                if (meta.data[last]) {
                    const eventPosition = {
                        x: meta.data[last].x,
                        y: meta.data[last].y,
                    };

                    // Set active elements to focus on the last data point
                    chart.tooltip?.setActiveElements([{ datasetIndex: 0, index: last }], eventPosition);
                    chart.update();
                }

                if (typeof props?.onLeave === "function") props?.onLeave(e, meta);
            });
            return () => {
                chart.destroy();
            };
        }
    }, [props?.type, chartRef, data]);

    return (
        <Suspense fallback={props?.fallback || <div>Loading...</div>}>
            <canvas ref={chartRef} />
        </Suspense>
    );
}
