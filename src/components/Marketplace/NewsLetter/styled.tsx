import { styled } from '@mui/material';

export const Section = styled('section')(({ theme }) => ({
	position: 'relative',
	padding: '3rem 0',
}));
export const Header = styled('h2')(({ theme }) => ({
	marginBottom: '4rem',
	textAlign: 'center',
	fontSize: '2rem',
	lineHeight: 'normal',
	...(theme.palette.mode === 'light'
		? {
				color: 'rgb(19,23,64)',
		  }
		: {
				color: 'white',
		  }),
}));
export const ContentWrap = styled('div')({
	display: 'grid',
	gridTemplateColumns: 'repeat(1,minmax(0,1fr))',
	gap: '2.5rem',
	'@media screen and (min-width: 768px)': {
		gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
	},
	'@media screen and (min-width: 1025px)': {
		gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
	},
});
export const CardContent = styled('div')({
	transition: 'all ease 0.5s',
	textAlign: 'center',
	'&:nth-of-type(1)': {
		'.card-header': {
			backgroundColor: 'rgba(223, 242, 248, 1)',
			'&:hover': {
				backgroundColor: 'rgba(223, 242, 248, 1)',
			},
		},
		'.card-header-inner': {
			backgroundColor: 'rgba(117, 222, 255, 1)',
		},
	},
	'&:nth-of-type(2)': {
		'.card-header': {
			backgroundColor: 'rgba(196, 242, 227, 1)',
			'&:hover': {
				backgroundColor: 'rrgba(196, 242, 227, 1)',
			},
		},
		'.card-header-inner': {
			backgroundColor: 'rgba(27, 218, 155, 1)',
		},
	},
	'&:nth-of-type(3)': {
		'.card-header': {
			backgroundColor: 'rgba(230, 224, 241, 1)',
			'&:hover': {
				backgroundColor: 'rgba(230, 224, 241, 1)',
			},
		},
		'.card-header-inner': {
			backgroundColor: 'rgba(196, 166, 251, 1)',
		},
	},
	'&:nth-of-type(4)': {
		'.card-header': {
			backgroundColor: 'rgba(255, 208, 208, 1)',
			'&:hover': {
				backgroundColor: 'rgba(255, 208, 208, 1)',
			},
		},
		'.card-header-inner': {
			backgroundColor: 'rgba(239, 68, 68, 1)',
		},
	},
});
export const CardHeader = styled('div')({
	marginBottom: '1.5rem',
	display: 'inline-flex',
	borderRadius: '50%',
	padding: '0.75rem',
	// animation: 'AutoRotate 60s linear infinite',
	// '@keyframes AutoRotate': {
	// 	'0%': {
	// 		transform: 'rotate(0deg)',
	// 	},
	// 	'100%': {
	// 		transform: 'rotate(360deg)',
	// 	},
	// },
});
export const CardHeaderInner = styled('a')({
	display: 'inline-flex',
	height: '3rem',
	width: '3rem',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '50%',
	svg: {
		width: '1.25rem',
		height: '1.25rem',
		fill: '#ffffff',
	},
});
export const CardTitle = styled('h3')(({ theme }) => ({
	marginBottom: '1rem',
	fontSize: '1.25rem',
	lineHeight: 'normal',
	...(theme.palette.mode === 'light'
		? {
				color: 'rgb(19,23,64)',
		  }
		: {
				color: 'white',
		  }),
}));
export const CardDetail = styled('p')(({ theme }) => ({
	...(theme.palette.mode === 'light'
		? {}
		: {
				color: 'rgb(161,162,179)',
		  }),
}));
export const InfoWrap = styled('p')(({ theme }) => ({
	margin: '5rem auto 0 auto',
	maxWidth: '42rem',
	textAlign: 'center',
	fontSize: '1.25rem',
	lineHeight: 'normal',
	...(theme.palette.mode === 'light'
		? {
				color: 'rgb(19,23,64)',
		  }
		: {
				color: 'white',
		  }),
}));
export const FormWrap = styled('div')({
	margin: '1.75rem auto 0 auto',
	maxWidth: '28rem',
	textAlign: 'center',
});
export const FormEmail = styled('form')({
	position: 'relative',
});
export const InputForm = styled('input')(({ theme }) => ({
	width: '100%',
	borderRadius: '16px',
	border: '1px solid',
	padding: ' 1rem',
	fontWeight: '500',
	fontSize: '1rem',
	borderColor: 'rgb(231,232,236)',
	...(theme.palette.mode === 'light'
		? {}
		: {
				backgroundColor: 'hsla(0,0%,100%,.15)',
				color: '#ffffff',
				borderColor: 'transparent',
		  }),
	'::placeholder': {
		...(theme.palette.mode === 'light'
			? {}
			: {
					color: '#ffffff',
			  }),
	},
}));
export const FormButton = styled('button')(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	right: '0.5rem',
	transform: 'translateY(-50%)',
	border: ' none',
	borderRadius: '12px',
	// backgroundColor: 'rgb(131,88,255)',
	background:
		'linear-gradient(52deg, #00ff36 7%, rgb(0, 238, 87) 17%, rgb(0, 197, 173) 37%, #00a4f1 52%, #0b18fc 88%, rgb(13, 0, 255) 94%)',
	padding: '0.5rem 1.5rem',
	fontSize: '.875rem',
	lineHeight: 'normal',
	color: 'white',
}));
