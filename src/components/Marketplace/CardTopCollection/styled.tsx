import { styled, Stack, Typography, Avatar } from '@mui/material';

export const CollectionItem = styled(Stack)(({ theme }) => ({
	cursor: 'pointer',
	borderRadius: '8px',
	padding: '10px 15px',
	transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
	position: 'relative',
	border: '1.8px solid #E7E8EC',

	'&:hover': {
		...(theme.palette.mode === 'light'
			? {
					// boxShadow: theme.customShadows.cardLightHover,
					boxShadow: '0px 3px 6px rgba(13, 16, 45, 0.25)',
					// transform: 'translateY(-2px)',
			  }
			: {
					// boxShadow: theme.customShadows.cardDarkHover,
					boxShadow: 'rgb(0 0 0 / 10%) 0px 0px 0px 2px',
					// transform: 'translateY(-2px)',
			  }),
	},

	// ...(theme.palette.mode === 'light'
	// 	? {
	// 		boxShadow: theme.customShadows.cardLight,
	// 		background: theme.palette.primaryLight.lighter,
	// 	}
	// 	: {
	// 		// backgroundColor: theme.palette.primary.dark,
	// 		// backgroundImage: theme.palette.gradients.third,
	// 		background: 'white',
	// 	}),
	// boxShadow: theme.customShadows.cardLight,
	// background: theme.palette.primaryLight.lighter,
}));

export const CollectionRank = styled(Typography)(({ theme }) => ({
	width: 24,
	height: 24,
	fontWeight: 'bold',
	position: 'absolute',
	left: '6px',
	borderRadius: '50%',
	border: '2px solid #fff',
	padding: '4px',
	background: '#131740',
	color: '#fff',
	zIndex: 1,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	fontSize: 12,
}));

export const CollectionAvatar = styled(Avatar)(({ theme }) => ({
	width: 50,
	height: 50,
	backgroundColor: 'black',
	borderRadius: '0.625rem',
}));

export const CollectionInfo = styled(Stack)(({ theme }) => ({
	marginLeft: 10,
	minWidth: 0,
}));

export const NameInfo = styled(Typography)(({ theme }) => ({
	fontWeight: 600,
}));

export const TotalInfo = styled(Typography)(({ theme }) => ({
	opacity: 0.5,
}));

export const LinkWrapper = styled('a')(({ theme }) => ({
	// ...(theme.palette.mode === 'light'
	// 	? {
	// 			color: 'black',
	// 	  }
	// 	: {
	// 			color: 'white',
	// 	  }),
	color: '#131740',
}));
