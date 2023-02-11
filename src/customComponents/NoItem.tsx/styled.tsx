import { styled, Box, Typography, Stack } from '@mui/material';

export const NoItemWrapper = styled(Stack)(({ theme }) => ({
	alignItems: 'center',
	width: '100%',
	padding: 33,
}));

export const NoItemCard = styled(Box)(({ theme }) => ({
	width: 170,
	height: 170,
	borderRadius: '50%',
	position: 'relative',
	border: '1px solid',
	borderColor: theme.palette.primary.light,

	'&::before': {
		content: '""',
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		background: 'rgba(255, 255, 255, 0.05)',
		borderRadius: '50%',
	},
}));

export const CardContent = styled(Stack)(({ theme }) => ({
	alignItems: 'center',
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
}));

export const CardImage = styled(Box)(({ theme }) => ({
	width: 50,
	height: 50,
	img: {
		width: '100%',
		height: '100%',
	},
}));

export const CardText = styled(Typography)(({ theme }) => ({
	marginTop: 12,
	whiteSpace: 'nowrap',
	color: theme.palette.primary.light,
	fontWeight: 500,
}));

export const Point = styled('div')({
	position: 'absolute',
	width: '15px',
	height: '15px',
	borderRadius: '100%',
	backgroundColor: 'white',
	zIndex: 2000,
});