import { styled } from '@mui/material';
// import BackgroundImage from 'assets/images/home/bg-img.webp';

export const ToastifyWrapper = styled('div')(({ theme }) => ({
	...(theme.palette.mode === 'light'
		? {}
		: {
				'--toastify-color-light': 'rgba(255, 255, 255, 0.2)',
				'--toastify-text-color-light': '#e5e3e3',
		  }),
}));
