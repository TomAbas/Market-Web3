/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Stack, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from '../../../../../../node_modules/swiper/react/swiper-react.js';
import { Pagination, Navigation } from 'swiper';
import '../../../../../../node_modules/swiper/swiper.min.css';
import '../../../../../../node_modules/swiper/modules/pagination/pagination.min.css';
import '../../../../../../node_modules/swiper/modules/navigation/navigation.min.css';
import { ItemCover, SwiperSlideItemAuctionDetail, ItemCoverMedia } from './styled';
//IMG
import { compressImage, getFileType, sliceString } from 'utils/function';
import ReactPlayer from 'react-player/lazy';
import { useState } from 'react';

export interface PropListItemAuction {}

export default function ListItemsSliderAuctionDetail(props: PropListItemAuction) {
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const auctionDetail = { items: [] };
	const isLoading = true;
	const renderImgSmall = () => {
		return auctionDetail?.items.map((item: any, index: number) => {
			return (
				<SwiperSlide key={index}>
					<SwiperSlideItemAuctionDetail>
						{getFileType(item.itemMedia) === 'mp4' ? (
							<ItemCover>
								<ItemCoverMedia
									onMouseOver={() => {
										setIsPlaying(true);
									}}
									onMouseOut={() => {
										setIsPlaying(false);
									}}
								>
									<ReactPlayer
										url={compressImage(item.itemMedia, 480, 'best')}
										className="react-player"
										muted={true}
										playing={isPlaying}
										loop={true}
										controls={isPlaying}
										volume={0.5}
										config={{
											file: {
												attributes: {
													controlsList: 'nodownload',
												},
											},
										}}
										style={{
											width: '100px !important',
											height: '100%',
										}}
									/>
								</ItemCoverMedia>
							</ItemCover>
						) : (
							<ItemCover>
								<img
									src={item.itemMedia}
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
							</ItemCover>
						)}

						<Typography marginTop="8px" sx={{ opacity: '0.6' }}>
							{'sliceString(auctionDetail.infoINO.nameINO, 10)'}
						</Typography>
						<Typography sx={{ fontWeight: '600' }}>
							{'sliceString(item.itemName, 20)'}
						</Typography>
					</SwiperSlideItemAuctionDetail>
				</SwiperSlide>
			);
		});
	};

	return (
		<Box mt={1}>
			<>
				<Swiper
					slidesPerView={3}
					spaceBetween={30}
					slidesPerGroup={3}
					loop={true}
					loopFillGroupWithBlank={true}
					// navigation={true}
					modules={[Pagination, Navigation]}
					className="mySwiper"
					breakpoints={{
						0: {
							slidesPerView: 2,
							slidesPerGroup: 2,
						},
						547: {
							slidesPerView: 2,
							slidesPerGroup: 2,
						},
						800: {
							slidesPerGroup: 3,
							slidesPerView: 3,
						},
						1093: {
							slidesPerGroup: 3,
							slidesPerView: 3,
						},
					}}
				>
					{renderImgSmall()}
				</Swiper>
			</>
		</Box>
	);
}
