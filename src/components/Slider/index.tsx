/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
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
import { Box, Grid, Link, Stack, Typography } from '@mui/material';
import { getItemSelected } from 'api/items/itemsApi';
import { ItemImage } from 'components/Marketplace/CardCollection/styled';
import NoMaxWidthTooltip from 'customComponents/LongToolTip/LongToolTip';
import { displayUserFullName } from 'utils/formatDisplay';

const ListImages = [
	{
		_id: 1,
		itemMedia: Asset1,
		itemName: 'Asset1',
		creatorInfo: {
			avatar: Asset1,
			username: 'Asset1',
		},
	},
	{
		_id: 2,
		itemMedia: Asset2,
		itemName: 'Asset2',
		creatorInfo: {
			avatar: Asset2,
			username: 'Asset2',
		},
	},
	{
		_id: 3,
		itemMedia: Asset3,
		itemName: 'Asset3',
		creatorInfo: {
			avatar: Asset3,
			username: 'Asset3',
		},
	},
	{
		_id: 4,
		itemMedia: Asset4,
		itemName: 'Asset4',
		creatorInfo: {
			avatar: Asset4,
			username: 'Asset4',
		},
	},
	{
		_id: 5,
		itemMedia: Asset5,
		itemName: 'Asset5',
		creatorInfo: {
			avatar: Asset5,
			username: 'Asset5',
		},
	},
];

const renderListImages = (ListImages: any) => {
	return ListImages.map((item: any) => {
		return (
			<SwiperSlide key={item._id}>
				<Box
					sx={{
						borderRadius: '14px',
					}}
				>
					<Link
						href={item._id.length > 0 ? `/#/item/${item._id}` : '/#'}
						target="_self"
						sx={{
							textDecoration: 'none',
							color: '#131740',
						}}
					>
						<Box
							sx={{
								border: '1.5px solid #e7e8ec',
								borderRadius: '12px',
								overflow: 'hidden',
								cursor: 'pointer',
								transition: 'all 0.4s',
								padding: '12px 12px 0',
								background: '#fff',
							}}
						>
							<ItemImage>
								<Box className="main-img">
									<img src={item.itemMedia} alt="collection" height={'100%'} />
								</Box>
							</ItemImage>

							<Box py={1.5}>
								<Typography
									variant="subtitle1"
									fontWeight={500}
									noWrap
									sx={{ cursor: 'pointer', flex: '1' }}
								>
									<NoMaxWidthTooltip title={displayUserFullName(item?.itemName)}>
										<Typography fontWeight="500" variant="subtitle1" noWrap>
											{item?.itemName}
										</Typography>
									</NoMaxWidthTooltip>
								</Typography>
								<Stack
									mt={1}
									direction="row"
									alignItems="center"
									justifyContent="space-between"
									gap={1}
								>
									<Stack direction="row" gap={1} alignItems="center">
										<Box
											sx={{
												img: {
													width: '32px',
													height: '32px',
													objectFit: 'cover',
													objectPosition: 'center',
													borderRadius: '50%',
												},
											}}
										>
											<img src={item?.creatorInfo?.avatar} alt="collection" />
										</Box>
										<NoMaxWidthTooltip
											title={displayUserFullName(item?.creatorInfo?.username)}
										>
											<Typography variant="body1" noWrap>
												{item?.creatorInfo?.username}
											</Typography>
										</NoMaxWidthTooltip>
										{/* <Typography variant="body1">
											{item?.creatorInfo?.username}{' '}
										</Typography> */}
									</Stack>
								</Stack>
							</Box>
						</Box>
					</Link>
				</Box>
			</SwiperSlide>
		);
	});
};

export default function Slider() {
	let [listItem, setListItem] = useState([]);
	useEffect(() => {
		getItemSelected().then((res: any) => {
			setListItem(res.data);
		});
	}, []);
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
				{listItem.length > 0 ? renderListImages(listItem) : renderListImages(ListImages)}
			</Swiper>
		</Box>
	);
}
