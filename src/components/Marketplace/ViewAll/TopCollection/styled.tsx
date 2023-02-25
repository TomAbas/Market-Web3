import { Typography, styled, Box, Stack } from '@mui/material';

export const FilterTrendingCollection = styled(Typography)(({ theme }) => ({
	// width: 120,
	display: 'flex',
	alignItems: 'center',
	color: theme.palette.primary.light,
	cursor: 'pointer',
	fontWeight: 600,
	paddingLeft: '0.5rem',
}));

export const FilterContent = styled(Box)({
	display: 'flex',
	justifyContent: 'center',
	'@media screen and (max-width: 432px)': {
		flexDirection: 'column',
		alignItems: 'center',
	},
});

export const LinkWrapper = styled('a')(({ theme }) => ({
	...(theme.palette.mode === 'light'
		? {
				color: 'black',
		  }
		: {
				color: 'white',
		  }),
}));

export const HeaderSection = styled(Stack)(({ theme }) => ({
	alignItems: 'center',
	margin: '25px auto 0 auto',
}));

export const MainHeader = styled(Typography)(({ theme }) => ({
	textAlign: 'center',
	color: '#131740',
}));
export const SubTitle = styled(Typography)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginLeft: '8px',
	//
	WebkitTextFillColor: 'transparent',
	background: 'linear-gradient(270deg,#ff7356,#ff59e2 25.52%,#52ddf6 50%,#eadf4e 76.04%,#ff7356)',
	WebkitBackgroundClip: 'text',
	backgroundClip: 'text',
	backgroundSize: '200% auto',
	textAlign: 'center',
	fontWeight: 600,
	fontStyle: 'italic',
	animation: 'gradient 6s linear infinite',
	'@keyframes gradient': {
		'100%': {
			backgroundPosition: '200%',
		},
	},
}));

export const DropdownWrapper = styled(Box)(({ theme }) => ({
	border: '1px solid #E7E8EC',
	borderRadius: 12,
	backgroundColor: '#fff',
	// ...(theme.palette.mode === 'light'
	// 	? {
	// 			backgroundColor: theme.palette.primaryLight.lighter,
	// 	  }
	// 	: {
	// 			backgroundImage: 'linear-gradient(to left, #00284b 0%, #020a1a 100%)',
	// 	  }),
}));

export const ListOption = styled('ul')(({ theme }) => ({
	overflowY: 'auto',
	maxHeight: 300,
	marginTop: 10,
	marginBottom: 10,
	'&::-webkit-scrollbar': {
		display: 'block',
		width: '3px',
		height: '4px',
	},
	'&::-webkit-scrollbar-track': {
		display: 'block',
		background: '#E7E8EC',
	},
	'&::-webkit-scrollbar-thumb': {
		display: 'block',
		background: '#fff',
		borderRadius: '5px',
	},
}));

export const OptionItem = styled('li')(({ theme }) => ({
	position: 'relative',
	listStyleType: 'none',
	padding: '6px 0',
	cursor: 'pointer',
	transition: 'all 0.4s',

	'&:hover': {
		background: '#E7E8EC',
		boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.25)',
		// ...(theme.palette.mode === 'light'
		// 	? {
		// 			background: theme.palette.primaryLight.main,
		// 	  }
		// 	: {
		// 			background: theme.palette.primary.main,
		// 	  }),
	},
}));
export const OptionItemText = styled(Typography)(({ theme }) => ({
	textAlign: 'left',
	paddingLeft: '24px',
	fontWeight: 500,
}));

export const CheckIconWrapper = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	right: 24,
	transform: 'translateY(-50%)',
	width: 20,
	height: 20,
}));
