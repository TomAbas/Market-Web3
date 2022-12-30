import { Stack, styled } from '@mui/material';

export const ConnectWalletContainer = styled('div')(({ theme }) => ({
	position: 'relative',
	whiteSpace: 'nowrap',
	display: 'flex',
	borderRadius: '50%',
	overflow: 'hidden',
	// margin: '0 !important',

	'&::before': {
		content: '""',
		position: 'absolute',
		height: '100%',
		width: '100%',
		zIndex: -1,
	},
}));

export const ConnectWalletChild = styled('div')(({ theme }) => ({
	bottom: '12px',
	width: '34px',
	height: '34px',
	cursor: 'pointer',
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'center',
	backdropFilter: 'blur(2px)',
	borderRadius: '50%',

	//   ...(theme.palette.mode === "light"
	//     ? {
	//         background: theme.palette.primaryLight.lighter,
	//         boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.2)",
	//       }
	//     : {
	//         background: theme.palette.primaryDark.backgroundCard,
	//       }),
}));

export const ConnectWalletImgBox = styled('div')(() => ({
	img: {
		width: '14px',
		height: '100%',
	},
}));

export const DropDownContent = styled(Stack)(({ theme }) => ({
	marginTop: '1.5rem',
	right: 0,
	minWidth: 180,
	borderRadius: 12,
	zIndex: 100,
	top: 0,
	animation: 'smoothAppear 0.5s',
	//   backgroundColor: theme.palette.primaryLight.lighter,
	//   boxShadow: theme.customShadows.cardLightHover,
	[theme.breakpoints.down(400)]: {
		right: '-80px',
	},
	...(theme.palette.mode === 'light'
		? {
				// backgroundColor: theme.palette.primaryLight.lighter,
				// boxShadow: theme.customShadows.cardLightHover,
		  }
		: {
				// background: theme.palette.primaryDark.backgroundCard,
		  }),

	'&.active': {
		display: 'block',
	},
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
