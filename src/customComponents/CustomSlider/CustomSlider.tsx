import React from 'react';
import { Swiper, SwiperSlide } from '../../../node_modules/swiper/react/swiper-react.js';
// Import Swiper styles
import '../../../node_modules/swiper/swiper.min.css';
import '../../../node_modules/swiper/modules/pagination/pagination.min.css';
import '../../../node_modules/swiper/modules/navigation/navigation.min.css';
import '../../../node_modules/swiper/modules/grid/grid.min.css';
// import '../../../node_modules/swiper/modules/navigation/navigation.min.css';
// import '../../../node_modules/swiper/modules/effect-coverflow/effect-coverflow.min.css';
// import '../../../node_modules/swiper/swiper.min.css';
// import required modules
import { Navigation, Autoplay, Grid } from 'swiper';
import { SwiperSlideItem, SwiperWrapper } from './styled';

export type CustomSliderProps = {
	delay?: number;
	slidesPerView: number;
	loop: boolean;
	spaceBetween: number;
	centeredSlides: boolean;
	slidesPerGroup: number;
	slidesToShowPoint1358?: number;
	slidesToShowPoint1093?: number;
	slidesToShowPoint828?: number;
	slidesToShowPoint547?: number;
	slidesToShowPoint320?: number;
	slidesToShowPoint0?: number;
	renderItem: any;
};

const CustomSlider = ({
	delay,
	slidesPerView,
	loop,
	spaceBetween,
	centeredSlides,
	slidesPerGroup,
	slidesToShowPoint1358,
	slidesToShowPoint1093,
	slidesToShowPoint828,
	slidesToShowPoint547,
	slidesToShowPoint320,
	slidesToShowPoint0,
	renderItem,
}: CustomSliderProps) => {
	console.log('renderItem', renderItem);
	const renderListItem = () =>
		renderItem.map((item: any, index: number) => (
			<SwiperSlide key={index}>
				<SwiperSlideItem className="slide-item">{item}</SwiperSlideItem>
			</SwiperSlide>
		));

	return (
		<SwiperWrapper>
			<Swiper
				slidesPerView={slidesPerView}
				spaceBetween={spaceBetween}
				loop={loop}
				// autoplay={
				// 	!delay
				// 		? false
				// 		: {
				// 				delay: delay,
				// 				disableOnInteraction: false,
				// 		  }
				// }
				autoplay={{
					delay: 6000,
					disableOnInteraction: false,
				}}
				slidesPerGroup={slidesPerGroup}
				centeredSlides={centeredSlides}
				navigation={true}
				modules={[Autoplay, Navigation, Grid]}
				className="mySwiper"
				breakpoints={{
					0: {
						slidesPerView: slidesToShowPoint0,
					},
					320: {
						slidesPerView: slidesToShowPoint320,
					},
					547: {
						slidesPerView: slidesToShowPoint547,
					},
					828: {
						slidesPerView: slidesToShowPoint828,
					},
					1093: {
						slidesPerView: slidesToShowPoint1093,
					},
					1358: {
						slidesPerView: slidesToShowPoint1358,
					},
				}}
			>
				{renderListItem()}
			</Swiper>
		</SwiperWrapper>
	);
};

export default CustomSlider;
