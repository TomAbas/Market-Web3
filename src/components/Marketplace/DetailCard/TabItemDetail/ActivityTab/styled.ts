import { Box, styled } from '@mui/material';

export const TabWrapperContainer = styled(Box)(({ theme }) => ({
	borderRadius: '8px',
	padding: '4px',
	boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.25)',
	backgroundColor: '#fff',
	borderColor: '#5A5D79',
}));

export const TabWrapper = styled(Box)(({ theme }) => ({
	padding: '10px 30px 15px 30px',

	// borderTop: 'none',

	// borderBottomLeftRadius: theme.shape.borderRadius,
	// borderEndEndRadius: theme.shape.borderRadius,

	overflow: 'auto',
	height: 300,

	'&::-webkit-scrollbar': {
		display: 'block',
		width: 3,
		height: 5,
		padding: '2px',
	},
	'&::-webkit-scrollbar-track': {
		display: 'block',
		background: '#0c5599',
	},
	'&::-webkit-scrollbar-thumb': {
		display: 'block',
		background: '#65b8ff',
		borderRadius: '5px',
	},
}));
export const HistoryRow = styled(Box)(({ theme }) => ({
	paddingTop: 10,
	paddingBottom: 10,
	minWidth: 600,
}));

export const StyledSpan = styled('span')(({ theme }) => ({
	color: theme.palette.text.secondary,
}));
