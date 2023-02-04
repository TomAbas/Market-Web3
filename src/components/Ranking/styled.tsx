import { Typography, styled, Box, Stack } from '@mui/material';
export const CollectionName = styled('div')({
	display: 'flex',
	justifyContent: 'start',
	alignItems: 'center',
	gap: 5,
	// minWidth: 300,
	width: '100%',
});

export const TableWrapper = styled('div')(({ theme }) => ({
	width: '100%',
	maxHeight: '100vh',
	overflow: 'auto',
	WebkitOverflowScrolling: 'touch',
	borderRadius: '12px',
	border: '1px solid #E7E8EC',

	'&::-webkit-scrollbar': {
		display: 'block',
		height: 5,
		width: 5,
	},
	'&::-webkit-scrollbar-track': {
		display: 'block',
		background: '#E7E8EC',
		borderRadius: 5,
	},
	'&::-webkit-scrollbar-thumb': {
		display: 'block',
		background: theme.palette.primary.light,
		borderRadius: 5,
	},
}));

export const TableScrollable = styled('table')(({ theme }) => ({
	overflow: 'auto',
	// backgroundColor: theme.palette.primary.dark,
	tableLayout: 'fixed',
	position: 'relative',
	// borderCollapse: 'separate',
	borderCollapse: 'collapse',
	thead: {
		borderSpacing: '0px',
		th: {
			background: '#E7E8EC',
			whiteSpace: 'nowrap',
			// position: 'sticky',
			top: 0,
			zIndex: 1,
			width: '25vw',
			padding: '16px 5px',
			':first-of-type': {
				// position: 'sticky',
				left: 0,
				zIndex: 3,
				minWidth: '100px',
			},
			':second-of-type': {
				// position: 'sticky',
				left: 0,
				zIndex: 3,
				minWidth: 315,
			},
			p: {
				fontWeight: 500,
			},
		},
		tr: {
			// border: '2px solid',
			// borderColor: theme.palette.primary.main,
			borderRadius: 16,
			background: '#FFFFFF',
		},
	},
	tbody: {
		background: '#fff',
		th: {
			// position: 'sticky',
			left: 0,
			zIndex: 2,
			whiteSpace: 'nowrap',
			fontWeight: 400,
			padding: '14px 16px',

			// ...(theme.palette.mode === 'light'
			// 	? {
			// 			backgroundColor: theme.palette.primaryLight.dark,
			// 	  }
			// 	: {
			// 			backgroundColor: theme.palette.primary.dark,
			// 	  }),
			width: 315,
			':first-of-type': {
				padding: '0px 10px',
				left: '14px',
			},
		},
		tr: {
			borderBottom: '1px solid #E7E8EC',
			transition: 'all 0.4s',
			cursor: 'pointer',
			':hover': {
				boxShadow: '0px 2px 6px 0 rgb(0 0 0 / 20%)',
			},
			':last-child': {
				borderBottom: 0,
			},
			// ...(theme.palette.mode === 'light'
			// 	? {
			// 			backgroundColor: theme.palette.primaryLight.main,
			// 	  }
			// 	: {
			// 			backgroundColor: theme.palette.primary.darker,
			// 	  }),
			':nth-of-type(even)': {
				// ...(theme.palette.mode === 'light'
				// 	? {
				// 			backgroundColor: theme.palette.primaryLight.main,
				// 	  }
				// 	: {
				// 			backgroundColor: theme.palette.primary.dark,
				// 	  }),
				// th: {
				// 	...(theme.palette.mode === 'light'
				// 		? {
				// 				backgroundColor: theme.palette.primaryLight.main,
				// 		  }
				// 		: {
				// 				backgroundColor: theme.palette.primary.light,
				// 		  }),
				// },
			},
			':nth-of-type(odd)': {
				// ...(theme.palette.mode === 'light'
				// 	? {
				// 			backgroundColor: theme.palette.primaryLight.main,
				// 	  }
				// 	: {
				// 			backgroundColor: theme.palette.primary.dark,
				// 	  }),
				// th: {
				// 	...(theme.palette.mode === 'light'
				// 		? {
				// 				backgroundColor: theme.palette.primaryLight.dark,
				// 		  }
				// 		: {
				// 				backgroundColor: theme.palette.primary.light,
				// 		  }),
				// },
			},
		},
	},

	'td, th': {
		padding: '10px 1rem',
	},
}));

export const FlexBox = styled('div')({
	width: '100%',
	height: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	cursor: 'pointer',
});

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
	margin: '0 auto',
}));

export const MainHeader = styled(Typography)(({ theme }) => ({
	textAlign: 'center',
	color: '#131740',
}));
export const SubTitle = styled(Typography)(({ theme }) => ({
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
