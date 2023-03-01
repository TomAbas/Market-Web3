/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BoxImage, BoxTrick, MediaWrapperAuction } from './styled';
import { Swiper, SwiperSlide } from '../../../../../../node_modules/swiper/react/swiper-react.js';
import { Pagination, Navigation } from 'swiper';
import '../../../../../../node_modules/swiper/swiper.min.css';
import '../../../../../../node_modules/swiper/modules/pagination/pagination.min.css';
import '../../../../../../node_modules/swiper/modules/navigation/navigation.min.css';
import { SwiperSlideItemAuctionDetail } from './styled';
import { Typography } from '@mui/material';
import ReactPlayer from 'react-player/lazy';
import { compressImage, getFileType } from 'utils/function';
import { orderSell } from 'models/transaction';
// IMG

export interface auctionDetail {
	auctionDetail: orderSell;
}
export default function ItemImage({ auctionDetail }: auctionDetail) {
	const [indexSlide, setIndexSlide] = useState<number>();
	const [isPlaying, setIsPlaying] = useState<boolean>(false);

	// console.log('swiper index', swiper);
	const renderImg = () => {
		return (
			<SwiperSlide>
				<SwiperSlideItemAuctionDetail>
					{getFileType(auctionDetail.itemInfo?.itemMedia) === 'mp4' ? (
						<MediaWrapperAuction>
							<ReactPlayer
								url={auctionDetail.itemInfo?.itemMedia}
								className="react-player"
								muted={true}
								playing={true}
								loop={true}
								controls={true}
								volume={0.5}
								config={{
									file: {
										attributes: {
											controlsList: 'nodownload',
										},
									},
								}}
							/>
						</MediaWrapperAuction>
					) : (
						<img
							src={auctionDetail.itemInfo.itemMedia}
							alt="none"
							style={{
								borderRadius: '12px',
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: 'translate(-50%, -50%)',
								maxHeight: '100%',
								maxWidth: '100%',
								opacity: 1,
							}}
						/>
					)}
				</SwiperSlideItemAuctionDetail>
			</SwiperSlide>
		);
	};
	return (
		<Fragment>
			<BoxTrick>
				<BoxImage>
					<Swiper
						slidesPerView={1}
						spaceBetween={30}
						slidesPerGroup={1}
						loop={true}
						loopFillGroupWithBlank={true}
						// navigation={true}
						modules={[Pagination, Navigation]}
						className="mySwiper"
						initialSlide={0}
						// tabIndex={}
						onSlideChange={(e: any) => {
							setIndexSlide(e.realIndex + 1);
						}}
					>
						{renderImg()}
					</Swiper>
				</BoxImage>
			</BoxTrick>

			{/* <Typography
				sx={{
					opacity: 0.8,
					fontSize: '14px',
					textAlign: 'center',
					fontWeight: '500',
					mt: 1,
				}}
			>
				{indexSlide ? indexSlide : auctionDetail?.listItemId.length}/
				{auctionDetail?.listItemId.length}
			</Typography> */}
		</Fragment>
	);
}
