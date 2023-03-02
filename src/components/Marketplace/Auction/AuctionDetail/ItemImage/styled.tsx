import { Skeleton, styled } from '@mui/material';
import { Box } from '@mui/system';
export const BoxTrick = styled(Box)(({ theme }) => ({
	position: 'relative',
	borderRadius: 20,
	paddingTop: '100%',
	overflow: 'hidden',
	[theme.breakpoints.down(1200)]: {
		paddingTop: '82%',
	},
}));

export const BoxImage = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: 0,
	left: 0,
	width: '100%',
	height: 'auto',
	[theme.breakpoints.down(1200)]: {
		width: '80%',
		left: '50%',
		transform: 'translateX(-50%)',
	},
}));

export const SkeletonImage = styled(Skeleton)({
	width: 'auto',
	height: 'auto',
	maxWidth: '100%',
	maxHeight: '100%',
	borderRadius: 16,
});

export const ColorPicker = styled(Box)({
	width: 25,
	height: 25,
	cursor: 'pointer',
	border: '0.2px solid #fff',
	borderRadius: '50%',
	transition: 'all 0.2s',
	'&:hover': {
		transform: 'scale(1.2)',
	},
});

export const MediaWrapper = styled(Box)({
	// position: 'absolute',
	// top: '50%',
	// left: '50%',
	// transform: 'translate(-50%, -50%)',
	// maxHeight: '100%',
	// borderRadius: 16,
	width: '100%',
});

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
				backgroundColor: '007aff',
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
	transition: 'all 0.6s ease',
	position: 'relative',
	borderRadius: 20,
	paddingTop: '100%',
	overflow: 'hidden',
}));

export const MediaWrapperAuction = styled(Box)({
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
});
