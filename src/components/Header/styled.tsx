/* eslint-disable @typescript-eslint/no-unused-vars */
import { styled, Box, Link, AppBarProps, AppBar, Stack } from '@mui/material';

interface AppbarHeaderProps extends AppBarProps {
	background: boolean;
}

export const AppbarHeader = styled((props: AppbarHeaderProps) => {
	const { background, ...other } = props;
	return <AppBar {...other} />;
})(({ theme, background }) => ({
	padding: '1.5rem 10%',

	// ...(theme.palette.mode === 'light'
	// 	? {
	// 			backgroundImage: background
	// 				? 'linear-gradient(rgba(255, 255, 255, 0.98) 65%, transparent)'
	// 				: 'unset',
	// 	  }
	// 	: {
	// 			background: background
	// 				? 'linear-gradient(rgba(2, 12, 29, 0.584) 65%, transparent)'
	// 				: 'unset',
	// 	  }),
	'&.flurBackground': {
		backdropFilter: 'blur(25px)',
		background: 'rgb(255 255 255 / 15%)',
	},
	'@media (max-width: 800px)': {
		padding: '1.5rem 5%',
	},
	'@media (max-width: 650px)': {
		padding: '1.5rem 1rem',
	},
	...(theme.palette.mode === 'dark'
		? background
			? {
					// background: 'linear-gradient(rgba(2, 12, 29, 0.584) 65%, transparent)',
					background: 'rgb(35 35 35 / 20%)',
					backdropFilter: 'blur(6px)',
					borderBottom: '1px solid',
					borderColor: '#4b4b4b1c',
			  }
			: { background: 'unset' }
		: background
		? {
				// backdropFilter: 'saturate(180%) blur(20px)',
				// backgroundColor: 'rgba(255,255,255,0.72)',
				// borderBottom: 'solid 1px #d8d1d1',
		  }
		: {
				// backdropFilter: 'saturate(180%) blur(20px)',
				// backgroundColor: 'rgba(255,255,255,0.72)',
				// borderBottom: 'solid 1px #d8d1d1',
		  }),
}));

export const PageLogo = styled(Box)(({ theme }) => ({ flexShrink: '2' }));

export const MainNavBarWrapper = styled(Box)(({ theme }) => ({
	flexGrow: 1,
}));

export const LogoLink = styled(Link)(({ theme }) => ({
	// '.logoMobile': {
	// 	height: 50,
	// 	width: '100%',
	// },
	// '.logoPC': {
	// 	height: 50,
	// 	width: '100%',
	// },
	'@media screen and (max-width: 650px)': {
		'.logoMobile': {
			display: 'block',
		},
		'.logoPC': {
			display: 'none',
		},
	},
	'@media screen and (min-width: 651px)': {
		'.logoMobile': {
			display: 'none',
		},
	},
}));

export const AppearWrapper = styled(Box)(({ theme }) => ({
	display: 'none',
	'@media screen and (min-width: 1560px)': {
		display: 'block',
	},
}));

export const ConnectToWalletWrapper = styled(Box)(({ theme }) => ({
	display: 'none',
	'@media screen and (min-width: 750px)': {
		display: 'block',
	},
}));

export const NotiBox = styled('div')(({ theme }) => ({
	position: 'relative',
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '1rem',
	paddingRight: '2.3rem',

	...(theme.palette.mode === 'light'
		? {
				background: 'linear-gradient(rgb(106 232 255 / 80%) 100%, transparent)',
		  }
		: {
				background: 'linear-gradient(rgb(8 37 86 / 58%) 100%, transparent)',
		  }),
}));

export const ModalClose = styled('div')({
	position: 'absolute',
	top: 15,
	right: 15,
});

export const FixedBottomHeader = styled('div')(({ theme }) => ({
	position: 'fixed',
	zIndex: 999,
	bottom: 0,
	left: 0,
	width: '100%',

	display: 'none',
	padding: '5px',
	...(theme.palette.mode === 'dark'
		? {
				// background: 'linear-gradient(rgba(2, 12, 29, 0.584) 65%, transparent)',
				background: 'rgb(35 35 35 / 20%)',
				backdropFilter: 'blur(6px)',
				borderBottom: '1px solid',
				borderColor: '#4b4b4b1c',
		  }
		: {
				backdropFilter: 'saturate(180%) blur(20px)',
				backgroundColor: 'rgba(255,255,255,0.72)',
				borderBottom: 'solid 1px #d8d1d1',
		  }),
	'@media screen and (max-width: 785px)': {
		display: 'block',
		float: 'right',
	},
}));

export const IconItem = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	background: 'rgba(157, 195, 230, 0.6)',
	height: '34px',
	width: '34px',
	borderRadius: '50%',
	position: 'relative',
	cursor: 'pointer',
	transition: 'all 0.4s',
	'&:hover': {
		background: 'rgba(255, 0, 0, 0.6)',
		color: '#fff',
	},
}));

export const DropDownContent = styled(Stack)(() => ({
	position: 'absolute',
	fontWeight: '300',
	right: 0,
	minWidth: 180,
	borderRadius: 12,
	zIndex: 100,
	top: '130%',
	animation: 'smoothAppear 0.5s',
	backgroundColor: 'rgba(177, 218, 255, 0.45)',
	color: '#fff',
	fontFamily: '',
}));

export const LinkWrapper = styled('a')(() => ({
	transition: 'all ease 0.5s',
	color: '#fff',
}));
