import { Box, styled } from '@mui/material';

export const MediaErrorContent = styled(Box)({
	width: '100%',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	padding: 10,
	textAlign: 'center',
});

export const MediaWrapper = styled(Box)({
	position: 'absolute',
	top: 0,
	left: 0,
	height: '100%',
	width: '100%',

	'.react-player': {
		width: '0 !important',
		height: '0 !important',
	},
});
