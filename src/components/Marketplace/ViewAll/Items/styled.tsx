import { styled, Typography, Box } from '@mui/material';
export const screenBreakpoint = 1150;
export const FilterWrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	width: '300px',
	gap: '10px',
	[theme.breakpoints.down('md')]: {
		margin: '0px 5px',
	},
}));

export const FilterBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '11px',
	marginRight: 10,
	borderRadius: '10px',
	cursor: 'pointer',
	border: '1px solid #E7E8EC',
}));

export const DropdownContentStyled = styled(Box)(({ theme }) => ({
	fontStyle: 'italic',
	[theme.breakpoints.down(screenBreakpoint)]: {
		padding: 15,
		borderRadius: 10,
		border: '1px solid #E7E8EC',
	},
}));

export const FilterStack = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'start',

	'& > *': {
		marginRight: 15,
	},

	[theme.breakpoints.down(screenBreakpoint)]: {
		flexDirection: 'column',
		alignItems: 'start',

		'& > *': {
			marginBottom: 15,
		},
	},
}));

export const ButtonReset = styled(Typography)(({ theme }) => ({
	cursor: 'pointer',
	color: '#fff',

	'&:hover': {
		color: '#fff',
	},
}));
