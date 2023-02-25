import { Box, Typography, styled } from '@mui/material';

export const ContainerAuctionDetail = styled(Box)({
	maxWidth: '1400px',
	margin: '0 auto 32px',
});

export const FieldTitleName = styled(Typography)(({ theme }) => ({
	fontSize: '1rem',
	fontWeight: 600,
}));
