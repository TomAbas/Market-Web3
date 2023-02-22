import { styled, Typography, Box } from '@mui/material';

export const ContentText = styled(Typography)(({ theme }) => ({
	fontWeight: 400,
}));

export const PreviewItemWrapper = styled(Box)(({ theme }) => ({
	width: 320,
	flexShrink: 0,

	[theme.breakpoints.down(765)]: {
		width: 'auto',
	},
}));
