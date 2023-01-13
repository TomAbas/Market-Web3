import { Box, styled } from '@mui/material';

export const PlayBtn = styled(Box)(({ theme }) => ({
	position: 'absolute',
	bottom: 0,
	left: '45%',
	zIndex: 2,
	borderRadius: '50%',
	width: 32,
	height: 32,

	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',

	...(theme.palette.mode === 'light'
		? {
				backgroundColor: '#D8D8D8',
				'&:hover': {
					backgroundColor: '#BBBBBB',
				},
		  }
		: {
				backgroundColor: 'rgb(53, 56, 64)',
				'&:hover': {
					backgroundColor: '#595B64',
				},
		  }),
}));
