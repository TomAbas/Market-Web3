import { Box, styled } from '@mui/material';

export const OrderCard = styled(Box)(({ theme }) => ({
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	// justifyContent: 'space-between',
	padding: '12px',
	borderBottom: '1px solid grey',
	cursor: 'pointer',
	backgroundColor: '#fff',
	':hover': {
		'.ButtonDisplay': {
			display: 'block',
		},
	},
}));

export const StyledSpan = styled('span')(({ theme }) => ({
	fontWeight: 400,
	color: theme.palette.text.secondary,
}));

export const ButtonBox = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	right: 10,
	transform: 'translateY(-50%)',
	width: 'fit-content',
	display: 'none',
}));
export const GradIcon = styled(Box)({
	borderRadius: '50%',
	width: 25,
	height: 25,
});
