import { styled } from '@mui/material';

export const CustomImg = styled('img')(({ theme }) => ({
	transition: 'all ease 0.2s',
	display: 'block',
	filter: 'blur(8px)',
	borderRadius: '10px',
	'@keyframes blurImg': {
		from: {
			filter: 'blur(1px)',
		},

		to: {
			filter: 'blur(0px)',
		},
	},
}));
