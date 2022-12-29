/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, styled } from '@mui/material';
import background from '../../assets/images/background/background-footer.webp';
import backgroundtablet from '../../assets/images/background/background-footer-tablet.webp';
import bglight from '../../assets/images/background/BG1.webp';

export const BigContainer = styled(Box)(({ theme }) => ({
	padding: '0 0rem 6rem 0rem',
	maxWidth: '1600px',
	margin: '0 auto',
	// marginLeft: 'auto',
	'@media screen and (max-width: 900px)': { padding: '0 1rem 4rem' },
	'@media screen and (max-width: 600px)': { padding: '0 8px 8px 8px' },
}));
export const FooterWrap = styled('footer')(({ theme }) => ({
	// borderRadius: '12px',
	//   background: `url(${background})`,
	backgroundPosition: 'left bottom',
	backgroundSize: 'cover',
	backgroundRepeat: 'no-repeat',
	background: 'linear-gradient(180deg, #E0F4FF 0%, #FFFFFF 100%)',

	'@media screen and (max-width: 1582px)': {
		backgroundPosition: 'center center',
	},
	//   ...(theme.palette.mode === "light" && {
	//     background: `linear-gradient(0deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%),url(${bglight})`,
	//     backgroundSize: "cover",
	//     backgroundRepeat: "no-repeat",
	//     backgroundPosition: "center center",
	//   }),
}));

export const GridContent = styled(Box)({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	flexWrap: 'wrap',
	gap: '18px',

	'@media screen and (min-width: 768px)': {},
	'@media screen and (max-width: 768px)': {},
});
export const BrandWrap = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	textAlign: 'left',
	width: '32%',
	marginTop: '32px',
	'@media screen and (max-width: 1800px)': { padding: '0 0 0 70px' },
	'@media screen and (max-width: 1600px)': {
		width: '100%',
		alignItems: 'center',
		padding: 0,
		textAlign: 'center',
	},
	'@media screen and (max-width: 600px)': {
		width: '100%',
		alignItems: 'center',
		padding: '0',
	},
});
export const LogoLink = styled('a')(({ theme }) => ({
	color: 'inherit',
	textDecoration: 'none',
	marginBottom: '1.5rem',
	display: 'inline-block',
	marginTop: '-12px',

	flexShrink: 0,
	'.logoMobile': {
		width: '200px',
		height: 'auto',
	},
	'.logoPC': {
		width: '320px',
		height: 'auto',
	},
	'@media screen and (max-width: 450px)': {
		'.logoMobile': {
			display: 'block',
		},
		'.logoPC': {
			display: 'none',
		},
	},
	'@media screen and (min-width: 450px)': {
		'.logoMobile': {
			display: 'none',
		},
		'.logoPC': {
			display: 'block',
		},
	},
}));
export const FooterText = styled('p')(({ theme }) => ({
	marginBottom: '2rem',
	marginRight: '1rem',
	color: 'white',
	'@media screen and (max-width: 768px)': {
		textAlign: 'center',
		marginRight: 'unset',
	},
}));
export const SocialWrap = styled('div')({
	display: 'flex',
});
export const SocialIconLink = styled('a')({
	color: 'inherit',
	textDecoration: 'none',
	marginRight: '1.25rem',
	// width: '1.25rem',
	height: '1.25rem',
});
export const DetailColumn = styled('div')({
	width: '160px',
	marginTop: '32px',

	'@media screen and (max-width: 600px)': {
		width: '100%',
	},
});
export const DetailTitle = styled('h3')(({ theme }) => ({
	marginBottom: '1.5rem',
	fontSize: '.875rem',
	lineHeight: 'normal',
	// ...(theme.palette.mode === "light"
	//   ? {
	//       color: "rgba(19, 23, 64, 1)",
	//     }
	//   : {
	//       color: "white",
	//     }),
}));
export const DetailList = styled('ul')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	listStyle: 'none',
	color: 'white',
}));
export const ListRow = styled('li')({});
export const DetailLink = styled('a')(({ theme }) => ({
	textDecoration: 'none',
	color: '#5A5D79',
	// fontWeight: '500',
}));

export const DetailContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	// width: '60%',
	marginLeft: '32px',
	flexWrap: 'wrap',
	gap: '25px',
	// flexGrow: '1',
	justifyContent: 'space-between',
	'@media screen and (max-width: 1600px)': {
		width: '100%',
		gap: '15px',
		justifyContent: 'space-evenly',
	},
	'@media screen and (max-width: 900px)': {
		width: '100%',
		gap: '15px',
		display: 'grid',
		gridTemplateColumns: 'repeat(4,1fr)',
	},
	'@media screen and (max-width: 750px)': {
		justifyContent: 'space-between',
		display: 'grid',
		gridTemplateColumns: 'repeat(3,1fr)',
	},
	'@media screen and (max-width: 600px)': {
		width: '100%',
		gap: '8px',
		display: 'grid',
		gridTemplateColumns: 'repeat(2,1fr)',
	},
	'& div:nth-child(3)': {
		width: '185px',
	},
}));

export const LinkWrapper = styled('a')(({ theme }) => ({
	...(theme.palette.mode === 'light'
		? {
				color: 'black',
		  }
		: {
				color: 'white',
		  }),
}));
