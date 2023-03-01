import { Box, styled } from '@mui/material';

export const ItemOfferAuctionDetail = styled(Box)(({ theme }) => ({
	padding: '8px',
	display: 'flex',
	flexDirection: 'row',
	borderRadius: '12px',
	border: '1.5px solid #E7E8EC',
	backgroundColor: '#fff',

	transition: 'all 0.4s',

	// '&:hover': {
	// 	boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.25)',
	// },
}));

export const CoverOfferTab = styled(Box)(({ theme }) => ({
	marginTop: '8px',
	maxHeight: '400px',
	overflow: 'auto',
	'&::-webkit-scrollbar': {
		display: 'block',
		width: '3px',
		height: '4px',
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

export const BiderBoxStack = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	columnGap: '8px',
	alignItems: 'center',

	[theme.breakpoints.down(600)]: {
		flexDirection: 'column',
	},
}));
