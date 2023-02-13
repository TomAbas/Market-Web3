/* eslint-disable @typescript-eslint/no-unused-vars */
import { styled, Box, Stack, Typography } from '@mui/material';
import BackgroundImage from 'assets/images/home/bg-img.webp';

export const FirstSectionHomePage = styled(Box)(({ theme }) => ({
	position: 'relative',
	width: '100%',
	height: '100vh',
	zIndex: 3,
	[theme.breakpoints.down(600)]: {
		paddingTop: 70,
	},
	// ...(theme.palette.mode === 'light'
	// 	? {
	// 			background: theme.palette.background.pageBackground,
	// 	  }
	// 	: {
	// 			backgroundImage: theme.palette.gradients.secondary,
	// 			backgroundSize: 'cover',
	// 			backgroundRepeat: 'no-repeat',
	// 			backgroundPosition: 'bottom',
	// 	  }),
}));

export const OpacityBackground = styled(Box)(({ theme }) => ({
	// Temporarily remove img bg
	// position: 'absolute',
	// top: 0,
	// width: '100%',
	// height: '100%',
	// backgroundImage: `url('${BackgroundImage}')`,
	// opacity: 0.1,
	// zIndex: -2,
}));

export const HeaderSection = styled(Stack)(({ theme }) => ({
	alignItems: 'center',
	margin: '0 auto',
}));

export const HeaderSection1 = styled(Stack)(({ theme }) => ({
	alignItems: 'center',
	margin: '0 auto',
	display: 'flex',
	gap: '10px',
	flexDirection: 'row',
	justifyContent: 'center',
	'@media screen and (max-width:405px)': {
		img: {
			display: 'none',
		},
	},
}));

export const MainHeader = styled(Typography)(({ theme }) => ({
	textAlign: 'center',
	color: '#131740',
}));

export const SubHeader = styled(Typography)(({ theme }) => ({
	textAlign: 'center',
	marginTop: '1.5rem',
	marginBottom: '1rem',
	maxWidth: 800,
	color: 'rgba(29, 29, 31, 0.5)',
}));

export const ButtonViewAll = styled('span')(({ theme }) => ({
	cursor: 'pointer',
	fontWeight: 400,
	opacity: 1,
	marginLeft: 10,
	color: theme.palette.primary.light,
	'&:hover': {
		textDecoration: 'underline !important',
	},
}));

export const ImgCatchAFish = styled(Box)(({ theme }) => ({
	textAlign: 'center',
	width: 750,
	height: 600,
	margin: 'auto',
	img: {
		width: '100%',
		height: '100%',
	},
	'@media screen and (max-width:1500px)': {
		width: 700,
		height: 600,
	},
	'@media screen and (max-width:992px)': {
		width: 600,
		height: 500,
	},
	'@media screen and (max-width:683px)': {
		width: '80%',
		height: 'auto',
	},
}));

export const HeaderVideoContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	Direction: 'row',
	justifyContent: 'flex-end',
	alignItems: 'flex-end',
	gap: '1rem',
	padding: '8rem 0',
	zIndex: '10',
	marginRight: '12%',
	width: '100%',
	height: '100%',
	maxWidth: '1024px',
	marginLeft: 'auto',
	transition: 'all ease 0.5s',
	// [theme.breakpoints.down(1800)]: {
	// 	marginLeft: '35%',
	// },
	// [theme.breakpoints.down(1500)]: {
	// 	marginLeft: '25%',
	// },
	// [theme.breakpoints.down(1200)]: {
	// 	marginLeft: '15%',
	// },
}));

export const VideoHeader = styled('video')(({ theme }) => ({
	position: 'absolute',
	top: '0',
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	opacity: 0.8,
	zIndex: '-1',
}));

export const ButtonBlue = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-around',
	width: '9rem',
	borderRadius: '12px',
	padding: '6px 8px',
	textAlign: 'center',
	background: 'rgb(0, 64, 120)',
	marginLeft: '0.5rem',
	color: 'white',
	cursor: 'pointer',

	'&.disabled': {
		background: theme.palette.action.disabled,
		color: 'black',
	},

	'&:not(.disabled):hover': {
		background: 'rgb(0, 64, 150)',
	},
}));

export const TitleWrapper = styled(Box)(({ theme }) => ({
	width: '50%',
	minWidth: '640px',
	marginBottom: '4rem',
	[theme.breakpoints.down(420)]: {
		padding: '1rem',
		width: '100%',
	},
}));

export const ExploreCollection = styled(Box)(({ theme }) => ({
	position: 'relative',
	padding: ' 32px 16 32px',
	color: '#131740',
	// background: 'linear-gradient(180deg, #E0F4FF 0%, #FFFFFF 100%)',
	[theme.breakpoints.down(480)]: {
		padding: '8px 12px',
	},
	// ...(theme.palette.mode === 'light'
	// 	? {
	// 		background: `linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%),url(${bglight})`,
	// 		backgroundSize: 'cover',
	// 		backgroundRepeat: 'no-repeat',
	// 		backgroundPosition: 'center center',
	// 	}
	// 	: {}),
}));

export const BlurBackGround = styled(Box)(({ theme }) => ({
	zIndex: '11',
	height: '140px',
	width: '140px',
	position: 'absolute',
	top: '25%',
	right: '25%',
	// backdropFilter: 'blur(80px)',
	filter: 'blur(160px)',
	borderRadius: '50%',
	transition: 'all ease 2s',
	animation: 'blurMotion 5s infinite',
	'@keyframes blurMotion': {
		'0%': {
			opacity: '0.6',
		},
		'50%': {
			opacity: '0.4',
		},
		'100%': {
			opacity: '0.6',
		},
	},
}));

export const BlurBackGround1 = styled(Box)(({ theme }) => ({
	display: 'none',
	zIndex: '11',
	height: '140px',
	width: '140px',
	position: 'absolute',
	left: '25%',
	bottom: '25%',
	// backdropFilter: 'blur(80px)',
	filter: 'blur(160px)',
	borderRadius: '50%',
	transition: 'all ease 2s',
	animation: 'blurMotion 3s infinite',
	'@keyframes blurMotion': {
		'0%': {
			opacity: '0.8',
		},
		'50%': {
			opacity: '0.6',
		},
		'100%': {
			opacity: '0.8',
		},
	},
}));

export const HotService = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	padding: '0 1rem',
}));
export const ServiceTitle = styled(Box)(({ theme }) => ({
	fontSize: 20,
	textAlign: 'center',
	fontStyle: 'italic',
}));
export const EmailSearch = styled(Box)(({ theme }) => ({
	background: '#fff',
	width: '650px',
	borderRadius: '12px',
	border: '1px solid #E7E8EC',
	padding: '8px 8px',
	marginTop: '30px',
	display: 'flex',
	justifyContent: 'space-between',
	input: {
		outline: 'none',
		border: 0,
		fontSize: '16px',
		width: '70%',
	},
	[theme.breakpoints.down(670)]: {
		width: '480px',
	},
	[theme.breakpoints.down(500)]: {
		width: '310px',
	},
}));
export const SubTitle = styled(Typography)(({ theme }) => ({
	WebkitTextFillColor: 'transparent',
	background: 'linear-gradient(270deg,#ff7356,#ff59e2 25.52%,#52ddf6 50%,#eadf4e 76.04%,#ff7356)',
	WebkitBackgroundClip: 'text',
	backgroundClip: 'text',
	backgroundSize: '200% auto',
	textAlign: 'center',
	fontWeight: 600,
	fontStyle: 'italic',
	animation: 'gradient 6s linear infinite',
	'@keyframes gradient': {
		'100%': {
			backgroundPosition: '200%',
		},
	},
}));

export const LinkWrapper = styled('a')(({ theme }) => ({
	color: '#131740',
}));

export const ItemImage = styled(Box)(({ theme }) => ({
	position: 'relative',
	width: '100%',
	paddingTop: '100%',
	borderRadius: '12px',
	overflow: 'hidden',

	'.main-img img, video': {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		// maxHeight: '100%',
		// maxWidth: '100%',
		width: '100%',
		borderRadius: '10px',
	},
}));

export const FeatureWrapper = styled(Box)(({ theme }) => ({
	borderColor: 'grey',
	display: 'flex',
	justifyContent: 'center',
	background: '#fff',
	border: '1px solid #E7E8EC',
	borderRadius: '10px',
	marginLeft: '5px',
}));
