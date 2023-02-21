import { styled, Typography, Box } from '@mui/material';

export const Title = styled(Typography)({
	fontWeight: 500,
});
export const SelectAndInputWraper = styled(Box)(({ theme }) => ({
	borderRadius: '12px',
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	background: '#fff',
	border: '1px solid #E8E8E8',
}));
