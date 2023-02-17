import { Box, styled } from '@mui/material';

export const SwiperWrapper = styled(Box)(({ theme }) => ({
	position: 'relative',
	// img: {
	// 	display: 'block',
	// 	width: '100%',
	// 	height: '100%',
	// 	objectFit: 'cover',
	// },
	'.swiper': {
		position: 'static',
	},

	'.mySwiper': {
		'.swiper-button-prev, .swiper-button-next': {
			position: 'absolute',
			top: '50%',
			transform: 'translateY(10%)',
			width: 34,
			height: 34,
			borderRadius: '50%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',

			...(theme.palette.mode === 'light'
				? {
						// backgroundColor: theme.palette.primaryLight.dark,
				  }
				: {
						// backgroundColor: theme.palette.primary.main,
						// backgroundColor: theme.palette.primaryLight.dark,
				  }),

			'&::after': {
				fontSize: '15px',
				color: theme.palette.text.primary,
				opacity: 0.5,
				fontWeight: 600,
				fontStyle: 'normal',
			},

			'&:hover': {
				...(theme.palette.mode === 'light'
					? {
							// backgroundColor: theme.palette.primaryLight.darker,
							backgroundColor: 'rgba(217, 217, 217,0.4)',
					  }
					: {
							// backgroundColor: theme.palette.primary.light,
							// backgroundColor: theme.palette.primaryLight.dark,
							backgroundColor: 'rgba(217, 217, 217,0.4)',
					  }),
			},
		},
		'.swiper-button-prev': {
			left: -25,
		},
		'.swiper-button-next': {
			right: -25,
		},

		'.swiper-slide': {
			// '&.swiper-slide-active': {
			// 	'.slide-item': {
			// 		background: 'blue',
			// 		transform: 'scale(1)' :,
			// 	},
			// },
		},
	},
}));

export const SwiperSlideItem = styled(Box)(({ theme }) => ({
	padding: '12px',
	transition: 'all 0.6s ease',
	// display: 'flex',
	justifyContent: 'center',
}));
