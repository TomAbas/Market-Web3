/* eslint-disable @typescript-eslint/no-unused-vars */
import { styled, Box, Link, AppBarProps, AppBar, Stack } from '@mui/material';

interface AppbarHeaderProps extends AppBarProps {
	background: boolean;
}

export const AppbarHeader = styled((props: AppbarHeaderProps) => {
	const { background, ...other } = props;
	return <AppBar {...other} />;
})(({ theme, background }) => ({
	padding: '1.5rem 5%',

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
	'@media screen and (max-width: 450px)': {
		'.logoMobile': {
			display: 'block',
		},
		'.logoPC': {
			display: 'none',
		},
	},
	'@media screen and (min-width: 451px)': {
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
	background: '#fff',
	height: '34px',
	width: '34px',
	borderRadius: '50%',
	position: 'relative',
	transition: 'all 0.4s',
	color: '#000',
	border: '1.5px solid #e7e8ec',
	cursor: 'pointer',
}));

export const DropDownContent = styled(Stack)(() => ({
	position: 'absolute',
	fontWeight: '300',
	right: 0,
	minWidth: 220,
	borderRadius: 12,
	cursor: 'auto',
	zIndex: 100,
	top: '130%',
	animation: 'smoothAppear 0.5s',
	backgroundColor: '#fff',
	color: '#000',
}));

export const LinkWrapper = styled('a')(() => ({
	transition: 'all ease 0.5s',
	color: '#000',
}));

export const DropdownMenu = styled('div')(({ theme }) => ({
	borderRadius: '0 0 12px 12px',
	opacity: 1,
	visibility: 'hidden',
	position: 'absolute',
	top: '100%',
	left: '50%',
	transform: 'translateX(-50%)',
	transition: 'all 0.1s',
	zIndex: 100,
	backdropFilter: 'blur(8px)',
	width: 'fit-content',
	overflow: 'hidden',

	...(theme.palette.mode === 'light'
		? {
				background: '#fff',
				boxShadow: '0 10px 12px rgba(0,0,0,0.15)',
		  }
		: {
				backdropFilter: 'blur(25px)',
				background: '#89AED0',
		  }),
}));

export const DropdownMenuLink = styled('a')(({ theme }) => ({
	// position: 'relative',
	padding: '12px 10px',
	color: theme.palette.text.primary,
	cursor: 'pointer',
	transition: 'all ease 0.1s',
	minWidth: '160px',

	'&:not(:last-child):after': {
		content: '""',
		position: 'absolute',
		top: '100%',
		left: 0,
		width: '100%',
		height: '0.9px',
		// background: theme.palette.gradients.line,
	},

	...(theme.palette.mode === 'light'
		? {
				'&:hover': {
					background: 'rgba(0, 0, 0, 0.1)',
				},
		  }
		: {
				'&:hover': {
					// background: theme.palette.primaryDark.main,
				},
		  }),
}));

export const NavigationBarBigScreen = styled('ul')({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	gap: '2px',
	padding: '0 5px',
	width: '80%',
	'@media screen and (max-width: 2450px)': {
		width: '90%',
	},
	'@media screen and (max-width: 2350px)': {
		width: '100%',
	},
});

export const NavigationItemBigScreen = styled('li')(({ theme }) => ({
	position: 'relative',
	listStyleType: 'none',
	transition: 'all 0.1s',
	textAlign: 'center',
	padding: '12px',
	borderRadius: '12px 12px 0 0',
	width: '160px',

	'&:hover .dropdownMenu': {
		opacity: 1,
		visibility: 'visible',
	},
	'&:nth-child(2):hover': {
		borderRadius: '12px',
	},

	'&:nth-child(3):hover': {
		borderRadius: '12px',
	},

	'&:nth-child(5):hover': {
		borderRadius: '12px',
	},

	...(theme.palette.mode === 'light'
		? {
				'&:hover': {
					background: '#fff',
					// boxShadow: theme.customShadows.cardLight,
					backdropFilter: 'blur(8px)',
				},
		  }
		: {
				'&:hover': {
					backdropFilter: 'blur(25px)',
					background: '#89AED0',
				},
		  }),
}));

export const NavLinkBigScreen = styled(Link)(({ theme }) => ({
	// color: theme.palette.text.primary,
	color: 'rgb(29, 29, 31)',
	borderRadius: '16px',
	textDecoration: 'none !important',
}));
