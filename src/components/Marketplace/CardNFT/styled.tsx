import { styled, Card, Typography, Box } from '@mui/material';

export const ItemCardStyle = styled(Card)(({ theme }) => ({
	WebkitTransition: '0.2s all ease-out',
	MozTransition: '0.2s all ease-out',
	OTransition: '0.2s all ease-out',
	transition: '0.2s all ease-out',
	borderRadius: '12px',
	border: '1.8px solid #E7E8EC',
}));

export const ItemImage = styled(Box)(({ theme }) => ({
	position: 'relative',
	width: '100%',
	paddingTop: '100%',
	borderRadius: '12px',
	// overflow: 'hidden',
	cursor: 'pointer',

	'.main-img img, video': {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		// maxHeight: '100%',
		// maxWidth: '100%',
		width: '100%',
	},
}));

export const ItemFavorite = styled(Box)(({ theme }) => ({
	position: 'absolute',
	zIndex: '10',
	top: '85%',
	right: '12px',
	display: 'flex',
	flexDirection: 'row',
	gap: '4px',
	alignItems: 'center',
	height: '30px',
	borderRadius: '8px',
	padding: '8px',
	cursor: 'default',
	background: 'rgba(0, 0, 0, 0.15)',
	backdropFilter: 'blur(1.5px)',
	color: '#fff',
}));

export const IconFavorite = styled('img')(({ theme }) => ({
	height: 14,
	width: 'auto',
}));

export const ItemContent = styled(Box)(({ theme }) => ({}));

export const PriceStyle = styled(Typography)(({ theme }) => ({}));

export const PriceChangeStyle = styled(Typography)(({ theme }) => ({
	fontStyle: 'italic',
}));

export const ImageBlockchain = styled(Box)(({ theme }) => ({
	width: 20,
	height: 20,
	borderRadius: '50%',
	overflow: 'hidden',

	img: {
		width: '100%',
		height: '100%',
	},
}));

export const ContentFooter = styled(Box)(({ theme }) => ({
	borderRadius: '12px',
	overflow: 'hidden',
	position: 'relative',

	'&::before': {
		content: '""',
		position: 'absolute',
		height: '100%',
		width: '100%',
		opacity: 0.2,
		zIndex: -1,
	},
}));

export const BoxCountDown = styled(Box)(({ theme }) => ({
	position: 'absolute',
	height: '2.5rem',
	width: '60%',
	zIndex: '2',
	top: '-10px',
	left: '0',
	borderRadius: '12px',
	padding: '0.5rem',
	border: '1px solid #ffffff',
	backgroundImage:
		'linear-gradient(52deg,rgb(0, 255, 54) 7%,rgb(0, 238, 87) 17%,rgb(0, 197, 173) 37%,rgb(0, 164, 241) 52%,rgb(11, 24, 252) 88%,rgb(13, 0, 255) 94%)',
}));

export const AvatarIcon = styled(Box)(({ theme }) => ({
	transition: 'all 0.6s ease',
	cursor: 'pointer',
	':hover': {
		zIndex: 3,
		transform: 'translateY(-5px)',
	},
}));

export const GradIcon = styled(Box)({
	borderRadius: '50%',
	width: 25,
	height: 25,
});

export const ErrorContent = styled(Box)({
	width: '100%',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	padding: 12,
	textAlign: 'center',
});

export const StackCard = styled(Box)(({ theme }) => ({
	// transition: 'all .3s cubic-bezier(0,0,.5,1)',
	position: 'absolute',
	top: '-2px',
	width: '100%',
	height: '100%',
	borderRadius: '12px',

	...(theme.palette.mode === 'light'
		? {
				// boxShadow: theme.customShadows.cardLight,
		  }
		: {
				borderTop: '2px solid',
		  }),
}));

export const DropDownWrapper = styled(Box)(({ theme }) => ({
	borderRadius: '12px',
	minWidth: 120,
	padding: '8px 8px',
	// ...(theme.palette.mode === 'light'
	// 	? {
	// 			background: theme.palette.primaryLight.dark,
	// 	  }
	// 	: {
	// 			backgroundImage: theme.palette.gradients.modal,
	// 	  }),
}));

export const DropDownOption = styled(Typography)(({ theme }) => ({
	display: 'block',
	borderRadius: '12px',
	padding: '4px 8px',
	color: theme.palette.text.primary,
	cursor: 'pointer',
	transition: 'all 0.2s',
	whiteSpace: 'nowrap',
	fontWeight: '700',
	textAlign: 'left',
}));

export const LinkWrapper = styled('a')(({ theme }) => ({
	transition: 'all ease 0.5s',
	...(theme.palette.mode === 'light'
		? {
				color: 'rgba(19, 23, 64, 1)',
		  }
		: {
				color: 'white',
		  }),
}));
