'use client';
import {useState, useEffect, useRef, Suspense} from 'react';
import {Chart} from 'chart.js/auto';

export interface ChartJS {
	type?: 'bar' | 'line' | 'scatter' | 'bubble' | 'pie' | 'doughnut' | 'polarArea' | 'radar';
	color?: {
		default?: string;
		theme?: string;
	};
	data?: Data[];
	onHover?: Function;
	fallback?: any;
}

export interface Data {
	value?: number | string;
	time?: string;
}

export default function ChartJS(props: ChartJS) {
	const chartRef: any = useRef();

	const [data, setData] = useState<any>();
	const theme = props?.color?.theme && props?.color?.theme === 'light' ? '0,0,0' : '255,255,255';
	const [color, setColor] = useState({
		default: props?.color?.default ? `rgb(${props?.color?.default})` : `rgb(${theme})`,
		theme: {
			strong: `rgba(${theme}, 0.6)`,
			semi: `rgba(${theme}, 0.45)`,
			medium: `rgba(${theme}, 0.3)`,
			regular: `rgba(${theme}, 0.15)`,
			light: `rgba(${theme}, 0.05)`
		}
	});

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		layout: {
			padding: {
				left: 0,
				right: 64,
				top: 16,
				bottom: 0
			}
		},
		scales: {
			x: {
				display: false
			},
			y: {
				display: false
				// beginAtZero: true
			}
		},
		interaction: {
			// mode: 'nearest',
			// position: 'nearest',
			includeInvisible: true,
			intersect: false
		},
		plugins: {
			legend: {
				display: false
			},
			title: {
				display: true
			},
			tooltip: {
				enabled: true,
				padding: 0,
				borderColor: 'transparent',
				backgroundColor: 'transparent',
				callbacks: {
					// labelPointStyle: (context) => {
					//     return {
					//         pointStyle: 'triangle',
					//         rotation: 0
					//     };
					// },
					label: (value: any) => {
						if (typeof props?.onHover === 'function') props?.onHover(value);
						return '';
					},
					title: function () {
						return '';
					}
				}
			}
		}
	};

	const handleMouseLeave = () => {
		// if (typeof props?.onHover === "function") props?.onHover(value);
	};

	useEffect(() => {
		if (props?.data && props?.data?.length > 0) {
			setData({
				labels: props?.data?.map((data: Data) => data?.time),
				datasets: [
					{
						data: props?.data?.map((data: Data) => data?.value),
						borderColor: color.theme.medium,
						pointBorderColor: 'transparent',
						pointBackgroundColor: color.theme.strong,
						pointHoverBackgroundColor: `rgb(${theme})`,
						pointRadius: 2,
						pointHoverRadius: 4
					}
				]
			});
		}
	}, [props?.data]);

	useEffect(() => {
		if (chartRef?.current) {
			const chart = new Chart(chartRef?.current?.getContext('2d'), {
				type: props?.type,
				data: data,
				options: options
			});
			return () => {
				chart.destroy();
			};
		}
	}, [props?.type, chartRef, data]);

	return (
		<Suspense fallback={props?.fallback || <div>Loading...</div>}>
			<canvas ref={chartRef} onMouseLeave={handleMouseLeave} />
		</Suspense>
	);
}
