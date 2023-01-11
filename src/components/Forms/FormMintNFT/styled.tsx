import { styled, Box, Typography } from '@mui/material';

export const PageTitle = styled(Typography)({
	fontSize: '64px',
	fontWeight: 500,
	padding: '1.5rem 0',
});

export const FieldTitleName = styled(Typography)(({ theme }) => ({
	fontSize: '1.2rem',
	fontWeight: 500,
	marginBottom: '10px',
}));

export const FieldSubTitle = styled(Typography)({
	fontSize: '0.9rem',
	opacity: 0.5,
	fontWeight: 400,
});

export const FieldIcon = styled(Box)({
	width: 28,
	flexShrink: 0,
	marginTop: '7px',
	img: {
		width: 16,
		height: 14,
	},
});

export const LogoBox = styled(Box)(({ theme }) => ({}));

export const InputGroup = styled(Box)(({ theme }) => ({
	marginTop: 16,
}));

export const PreviewItemContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'start',
	justifyContent: 'space-between',
	gap: 40,
	minHeight: 400,

	[theme.breakpoints.down(765)]: {
		display: 'block',
	},
}));

export const PreviewItemWrapper = styled(Box)(({ theme }) => ({
	width: 320,
	flexShrink: 0,

	[theme.breakpoints.down(765)]: {
		width: 'auto',
	},
}));
