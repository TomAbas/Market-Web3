/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../../node_modules/swiper/modules/navigation/navigation.min.css';
import '../../../node_modules/swiper/modules/effect-coverflow/effect-coverflow.min.css';
import '../../../node_modules/swiper/swiper.min.css';

// import required modules
import { EffectCoverflow, Navigation, Autoplay } from 'swiper';

import Asset1 from 'assets/images/card/Asset1.webp';
import Asset2 from 'assets/images/card/Asset2.webp';
import Asset3 from 'assets/images/card/Asset3.webp';
import Asset4 from 'assets/images/card/Asset4.webp';
import Asset5 from 'assets/images/card/Asset5.webp';
import Asset6 from 'assets/images/card/Asset6.webp';
import Asset7 from 'assets/images/card/Asset7.webp';
import Asset8 from 'assets/images/card/Asset8.webp';
import Asset9 from 'assets/images/card/Asset9.webp';
import Asset10 from 'assets/images/card/Asset10.webp';

import { Box, Stack, Typography } from '@mui/material';

const ListImages = [
	{
		id: 1,
		image: Asset1,
	},
	{
		id: 2,
		image: Asset2,
	},
	{
		id: 3,
		image: Asset3,
	},
	{
		id: 4,
		image: Asset4,
	},
	{
		id: 5,
		image: Asset5,
	},
	{
		id: 6,
		image: Asset6,
	},
	{
		id: 7,
		image: Asset7,
	},
	{
		id: 8,
		image: Asset8,
	},
	{
		id: 9,
		image: Asset9,
	},
	{
		id: 10,
		image: Asset10,
	},
];

const renderListImages = () => {
	return ListImages.map((item) => {
		return (
			<SwiperSlide key={item.id}>
				<Box
					sx={{
						borderRadius: '14px',
					}}
				>
					<Box
						sx={{
							img: {
								borderRadius: '14px',
								width: '100%',
								height: 'auto',
							},
						}}
					>
						<img src={item.image} alt="item" />
					</Box>
				</Box>
			</SwiperSlide>
		);
	});
};

export default function Slider() {
	return (
		<Box
			px={4}
			sx={{
				'.swiper': {
					width: '100%',
					py: '10px',
				},
				// ".swiper-slide": {
				//   height: "500px",
				// },
				'.swiper-slide-shadow-right ': {
					borderRadius: '14px',
				},
				'.swiper-slide-shadow-left ': {
					borderRadius: '14px',
				},
				'.swiper-button-prev, .swiper-button-next': {
					width: 34,
					height: 34,
					'&::after': {
						fontStyle: 'normal',
						fontSize: '30px',
						fontWeight: 600,
					},
				},
			}}
		>
			<Swiper
				effect={'coverflow'}
				loop={true}
				centeredSlides={true}
				slidesPerView={'auto'}
				spaceBetween={50}
				coverflowEffect={{
					rotate: 25,
					stretch: 20,
					depth: 100,
					modifier: 1,
					slideShadows: true,
				}}
				autoplay={{ delay: 4000, disableOnInteraction: false }}
				navigation={true}
				modules={[Autoplay, EffectCoverflow, Navigation]}
				className="mySwiper"
				breakpoints={{
					320: {
						slidesPerView: 1,
					},
					480: {
						slidesPerView: 1.5,
					},
					768: {
						slidesPerView: 2,
					},
					850: {
						slidesPerView: 2.5,
					},
					1024: {
						slidesPerView: 3,
					},
					1220: {
						slidesPerView: 3.5,
					},
					1440: {
						slidesPerView: 4,
					},
					1700: {
						slidesPerView: 4.5,
					},
				}}
			>
				{renderListImages()}
			</Swiper>
		</Box>
	);
}
