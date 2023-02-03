import { styled } from '@mui/material';

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
				width: '1px',
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
