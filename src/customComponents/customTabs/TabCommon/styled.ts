import TabList from '@mui/lab/TabList';
import { styled, Tab } from '@mui/material';

export const TabListStyled = styled(TabList)(({ theme }) => ({}));

export const TabStyled = styled(Tab)(({ theme }) => ({
	color: 'black',

	'& .selected': {
		display: 'none',
	},
	'& .unselected': {
		display: 'block',
	},

	'&:hover': {
		color: '#007aff',
		'& .selected': {
			display: 'block',
		},
		'& .unselected': {
			display: 'none',
		},
	},
	'&.Mui-selected': {
		color: '#007aff',
		fontWeight: '600',
		'& .selected': {
			display: 'block',
		},
		'& .unselected': {
			display: 'none',
		},
	},
	'&.Mui-focusVisible': {
		backgroundColor: '007aff',
	},
}));
