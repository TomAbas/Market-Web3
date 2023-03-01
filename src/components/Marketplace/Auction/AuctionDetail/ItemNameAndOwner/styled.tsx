import { Box, styled } from '@mui/material';

export const DeviderGradientNext = styled(Box)(({ theme }) => ({
	margin: '0 12px',
	width: '1px',
	height: '92px',
	background: 'linear-gradient(to top,rgba(7, 104, 255, 0),#0768ff 53%,rgba(7, 104, 255, 0))',
}));

export const ContainerOwnerAndCollectionAuctionDetail = styled(Box)(({ theme }) => ({
	minWidth: '280px',
	padding: '8px',
	display: 'flex',
	flexDirection: 'row',
	borderRadius: '12px',
	marginTop: '8px',
	maxHeight: '76px',
	backgroundColor: '#fff',
}));
