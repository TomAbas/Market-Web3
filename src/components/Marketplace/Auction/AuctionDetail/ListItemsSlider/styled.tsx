import { Box, styled } from '@mui/material';

/* eslint-disable @typescript-eslint/no-unused-vars */
export const SwiperWrapperAuctionDetail = styled(Box)(({ theme }) => ({
	position: 'relative',
	img: {
		display: 'block',
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},
	'.swiper': {
		position: 'static',
	},

	'.mySwiper': {
		'.swiper-button-prev, .swiper-button-next': {
			position: 'absolute',
			top: '50%',
			width: 35,
			height: 35,
			borderRadius: '50%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: 'fff',

			'&::after': {
				fontSize: '15px',
				color: theme.palette.text.primary,
				opacity: 0.5,
				fontWeight: 600,
			},

			'&:hover': {
				backgroundColor: '#007aff',
			},
		},
		'.swiper-button-prev': {
			left: -15,
		},
		'.swiper-button-next': {
			right: -15,
		},

		'.swiper-slide': {
			// '&.swiper-slide-active': {
			// 	'.slide-item': {
			// 		background: 'blue',
			// 		transform: 'scale(1)',
			// 	},
			// },
		},
	},
}));

export const SwiperSlideItemAuctionDetail = styled(Box)(({ theme }) => ({
	padding: 10,
	transition: 'all 0.6s ease',
	textAlign: 'center',
	borderRadius: '12px',
	border: '1.5px solid #E7E8EC',
	backgroundColor: 'fff',
}));

export const ItemCover = styled(Box)(({ theme }) => ({
	position: 'relative',
	width: '100%',
	paddingTop: '100%',
	borderRadius: '10px',
	overflow: 'hidden',

	img: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		maxHeight: '100%',
		maxWidth: '100%',
	},
}));

export const ItemCoverMedia = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	maxHeight: '100%',
	maxWidth: '100%',
	video: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		maxHeight: '100%',
		maxWidth: '100%',
	},
}));
