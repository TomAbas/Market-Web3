import { styled, Box, Stack, Typography } from '@mui/material';

export const DetailStatistic = styled(Stack)(({ theme }) => ({
	flexDirection: 'row',
	border: '1px solid #E7E8EC',
	borderRadius: '12px',
	width: '100%',
	background: 'rgb(255,255,255)',
}));

export const StatisticBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	flexGrow: 1,
	position: 'relative',
	padding: 15,
	'&:not(:last-child)::after': {
		content: '""',
		position: 'absolute',
		top: 0,
		right: 0,
		width: 1,
		height: '100%',
		background: '#E7E8EC',
	},
}));

export const StatisticNumber = styled(Typography)(({ theme }) => ({
	fontWeight: 700,
}));

export const StatisticTitle = styled(Typography)(({ theme }) => ({}));

export const FeatureWrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	border: '1px solid #E7E8EC',
	borderRadius: '12px',
	background: '#fff',
	cursor: 'pointer',
}));
