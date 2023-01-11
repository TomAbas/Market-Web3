import { styled, Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
export const TopPart = styled(Box)(({ theme }) => ({
	paddingBottom: '25px',
	position: 'relative',
	'&::after': {
		content: '""',
		position: 'absolute',
		top: '100%',
		left: 0,
		width: '100%',
		height: '0.9px',
	},
}));

export const BoxChangeable = styled(Box)({
	position: 'relative',
	'& input': {
		opacity: 0,
		cursor: 'pointer',
		width: '100%',
		height: '100%',
		borderRadius: '50%',
		position: 'absolute',
		top: 0,
		left: 0,
	},
});

export const AvatarChangeable = styled(BoxChangeable)(({ theme }) => ({
	borderRadius: '50%',
	width: 'fit-content',
	border: '1px solid #0768ff',
}));

export const BackgroundChangeable = styled(BoxChangeable)(({ theme }) => ({}));

export const UserBackground = styled('img')(({ theme }) => ({
	display: 'block',
	width: '100%',
	height: 120,
	objectFit: 'cover',
	borderRadius: 10,
}));

export const InputGroup = styled(Box)(({ theme }) => ({
	marginTop: 10,
}));

export const Label = styled('label')(({ theme }) => ({
	color: theme.palette.text.primary,
	fontSize: 14,
	fontWeight: 600,
}));

export const ErrorMessage = styled(Typography)(({ theme }) => ({
	color: 'red',
	fontStyle: 'italic',
	fontSize: 14,
	marginTop: 3,
	'&::before': {
		content: '"*"',
	},
}));

export const Input = styled('input')(({ theme }) => ({
	display: 'block',
	borderRadius: '12px',
	padding: '15px',
	outline: 'none',
	width: '100%',
	fontSize: '16px',
	fontWeight: '500',
	lineHeight: '16px',
	color: '#131740',
	fontStyle: 'italic',
	background: '#fff',
	border: '1px solid #E7E8EC',
	fontFamily: 'Montserrat sans-serif',
}));

export const Textarea = styled('textarea')(({ theme }) => ({
	display: 'block',
	border: ' 1px solid #E7E8EC',
	outline: 'none',
	width: '100%',
	borderRadius: '5px',
	padding: '15px',
	fontSize: '16px',
	color: '#1D1D1F',
	background: '#fff',
	fontStyle: 'italic',
	fontFamily: 'Montserrat sans-serif',
}));

export const TopModal = styled(Stack)(({ theme }) => ({
	width: '100%',
	position: 'relative',
	height: '4rem',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	borderBottom: '1px solid #E7E8EC',
}));

export const TopTitleModal = styled('span')(({ theme }) => ({
	fontStyle: 'italic',
	fontWeight: '500',
	alignSelf: 'center',
	fontSize: '32px',
	padding: '10px 40px',
	textAlign: 'center',
}));

export const CloseIconButton = styled(CloseIcon)(({ theme }) => ({
	position: 'absolute',
	right: '10px',
	frontSize: '16px',
}));
