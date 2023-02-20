/* eslint-disable @typescript-eslint/no-unused-vars */
// material
import { alpha } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';
import { ApexOptions } from 'apexcharts';

// ----------------------------------------------------------------------

export function BaseOptionChartStyle() {
	const background = {
		backdropFilter: 'blur(6px)',
		WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
		backgroundColor: alpha('#fff', 0.72),
	};
	const transparent = alpha('#919EAB', 0.24);
	return (
		<GlobalStyles
			styles={{
				'&.apexcharts-canvas': {
					// Tooltip
					'.apexcharts-xaxistooltip': {
						...background,
						border: 0,
						boxShadow: `0 0 4px 0 ${transparent}, 0 24px 48px 0 ${transparent}`,
						color: '#fff',
						borderRadius: '12px',
						'&:before': { borderBottomColor: 'transparent' },
						'&:after': {
							borderBottomColor: alpha('#fff', 0.72),
						},
					},
					'.apexcharts-tooltip.apexcharts-theme-light': {
						...background,
						border: 0,
						boxShadow: `0 0 4px 0 ${transparent}, 0 24px 48px 0 ${transparent}`,
						borderRadius: '12px',
						'& .apexcharts-tooltip-title': {
							border: 0,
							textAlign: 'center',
							fontWeight: '600',
							backgroundColor: alpha('#919EAB', 0.16),
							color: 'black',
						},
					},
					// Legend
					'.apexcharts-legend': {
						padding: 0,
					},
					'.apexcharts-legend-series': {
						display: 'flex !important',
						alignItems: 'center',
					},
					'.apexcharts-legend-marker': {
						marginRight: 8,
					},
					'.apexcharts-legend-text': {
						lineHeight: '18px',
						textTransform: 'capitalize',
					},
				},
			}}
		/>
	);
}

export default function BaseOptionChart() {
	const result: ApexOptions = {
		// Colors
		colors: ['#007aff', '#fff', '#000'],

		// Chart
		chart: {
			toolbar: { show: false },
			zoom: { enabled: false },
			foreColor: '#637381',
			fontFamily: 'inherit',
		},

		// States
		states: {
			hover: {
				filter: {
					type: 'lighten',
					value: 0.04,
				},
			},
			active: {
				filter: {
					type: 'darken',
					value: 0.88,
				},
			},
		},

		// Fill
		fill: {
			opacity: 1,
			gradient: {
				type: 'vertical',
				shadeIntensity: 0,
				opacityFrom: 0.7,
				opacityTo: 0.2,
				stops: [0, 100],
			},
		},

		// Datalabels
		dataLabels: {
			enabled: false,
		},

		// Stroke
		stroke: {
			width: 3,
			curve: 'smooth',
			lineCap: 'round',
		},

		// Grid
		grid: {
			strokeDashArray: 3,
			borderColor: alpha('#919EAB', 0.24),
		},

		// Xaxis
		xaxis: {
			axisBorder: { show: false },
			axisTicks: { show: false },
		},

		// Markers
		markers: {
			size: 0,
			// strokeColors: theme.palette.background.paper,
			strokeColors: '#fff',
		},

		// Tooltip
		tooltip: {
			x: {
				show: false,
			},
		},

		// Legend
		legend: {
			show: true,
			fontSize: '13px',
			position: 'top',
			horizontalAlign: 'right',
			markers: {
				radius: 12,
			},
			fontWeight: 500,
			itemMargin: { horizontal: 12 },
			labels: {
				colors: 'black',
			},
		},

		// plotOptions
		plotOptions: {
			// Bar
			bar: {
				columnWidth: '28%',
				borderRadius: 4,
			},
			// Pie + Donut
			pie: {
				donut: {
					labels: {
						show: true,
						// value: LABEL_VALUE,
						// total: LABEL_TOTAL,
					},
				},
			},
			// Radialbar
			radialBar: {
				track: {
					strokeWidth: '100%',
					background: alpha('#919EAB', 0.16),
				},
				dataLabels: {
					// value: LABEL_VALUE,
					// total: LABEL_TOTAL,
				},
			},
			// Radar
			radar: {
				polygons: {
					fill: { colors: ['transparent'] },
					strokeColors: alpha('#919EAB', 0.24),
					connectorColors: alpha('#919EAB', 0.24),
				},
			},
			// polarArea
			polarArea: {
				rings: {
					strokeColor: alpha('#919EAB', 0.24),
				},
				spokes: {
					connectorColors: alpha('#919EAB', 0.24),
				},
			},
		},

		// Responsive
		responsive: [
			{
				// sm
				breakpoint: 600,
				options: {
					plotOptions: { bar: { columnWidth: '40%' } },
				},
			},
			{
				// md
				breakpoint: 768,
				options: {
					plotOptions: { bar: { columnWidth: '32%' } },
				},
			},
		],
	};

	return result;
}
