import { Box, styled, Stack, Link } from '@mui/material';

export const TabWrapper = styled(Box)(({ theme }) => ({
	padding: 20,
	borderRadius: '12px',
	background: '#fff',
	border: '1.5px solid #E7E8EC',
}));

export const DetailTitle = styled(Stack)(({ theme }) => ({
	minWidth: 150,
	color: 'rgba(29, 29, 31, 0.5)',
}));

export const ContractAddress = styled(Link)(({ theme }) => ({
	color: '#1d1d1f',
}));
