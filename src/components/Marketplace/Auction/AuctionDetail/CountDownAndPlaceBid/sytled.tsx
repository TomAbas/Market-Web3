import { Box, styled, Typography } from '@mui/material';

export const GridBoxBackGround = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	// ...(theme.palette.mode === 'light'
	// 	? {
	// 			backgroundColor: theme.palette.primaryLight.main,
	// 	  }
	// 	: {
	// 			backgroundColor: theme.palette.primary.dark,
	// 	  }),
}));

export const BoxContainCountDown = styled(Box)(({ theme }) => ({
	// borderColor: 'gradient(rgba(7, 104, 255, 0),#0768ff 53%,rgba(7, 104, 255, 0))',
}));

export const ErrorMessage = styled(Typography)(({ theme }) => ({
	color: 'red',
	fontStyle: 'italic',
	fontSize: 14,
	marginTop: 3,
	'&::before': {
		content: '"*"',
	},
}));
export const NoticeMessage = styled(Typography)(({ theme }) => ({
	fontStyle: 'italic',
	fontSize: 12,
	marginTop: 3,
	'&::before': {
		content: '"*"',
	},
}));

export const BottomLine = styled(Box)(({ theme }) => ({
	content: '""',
	height: '2px',
	width: '100%',
	margin: '0 auto',
	...(theme.palette.mode === 'light'
		? {
				background: 'black',
		  }
		: {
				background: 'white',
		  }),
}));
