/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, ClickAwayListener, Grid, Stack, Typography, Skeleton } from '@mui/material';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useNavigate } from 'react-router-dom';
import CardNFTUser from 'components/Marketplace/CardNFTUser';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTokens } from '../../hooks/useTokens';
import banner from '../../assets/banner.png';
import { getCollectionByUserAddress } from '../../api/collectionApi';
import { getCollectionData } from '../../service/aptos.service';
import aptos from '../../assets/images/card/aptos.jpg';
import { useSizeObersver } from 'contexts/SizeObserver';
import SkeletonCardNft from 'components/SkeletonCardNft';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectUser, toggleSettingModalA } from 'redux/slices/userInfo';
const MyCollectionDetail = () => {
	let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	const [loadingCollectionImg, setLoadingCollectionImg] = useState(true);
	const [loadingItem, setLoadingItem] = useState(true);
	const search = useLocation().search;

	//modalWallet

	const creator = decodeURIComponent(new URLSearchParams(search).get('creator') || '');
	const collection = decodeURIComponent(new URLSearchParams(search).get('collection') || '');
	const { innerWidth } = useSizeObersver();
	const [viewFull, setViewFull] = useState(false);
	const navigate = useNavigate();
	const { account } = useWallet();
	const [viewAvatar, setViewAvatar] = useState(false);
	const { tokens } = useTokens(account);
	const [collectionInfo, setCollectionInfo] = useState<any>('');
	const [items, setItems] = useState<any[]>([]);
	const dispatch = useAppDispatch();
	const userInfo = useAppSelector(selectUser);

	const handleItems = (index: any) => {
		let newItems = items.filter((_item, i) => i !== index);
		setItems(newItems);
	};
	useEffect(() => {
		console.log('userAddress', userInfo?.userAddress);
		let newCollection = new Map();
		tokens.map((item: any) => {
			let collection = newCollection.get(item?.collection + '*/////*' + item?.creator);
			if (!collection) {
				newCollection.set(item?.collection + '*/////*' + item?.creator, [item]);
			} else {
				collection.push(item);
				newCollection.set(item?.collection + '*/////*' + item?.creator, collection);
			}
		});
		const collections = Array.from(newCollection);
		const found =
			collections.find((value) => value[0] == `${collection}*/////*${creator}`) || [];
		setItems(found[1]);
		if (tokens.length > 0) {
			setLoadingItem(false);
		}
		const fetchData = async () => {
			let coll = await getCollectionData(creator, collection);
			console.log('collection', coll);
			setCollectionInfo(coll);
			setLoadingCollectionImg(false);
		};
		fetchData();
	}, [tokens]);

	const innerHeight = innerWidth / 4.5;

	const handleClickAway = () => {
		setViewFull(false);
	};
	const handleClickAvatar = () => {
		setViewAvatar(false);
	};

	return (
		<>
			<Box pt={13}>
				{loadingCollectionImg ? (
					<>
						{' '}
						<Box
							sx={{
								position: 'relative',
								display: 'flex',
								justifyContent: 'center',
								'& > img': {
									width: '100%',
									objectFit: 'cover',
									objectPosition: 'center',
									height: innerHeight,
									cursor: 'pointer',
								},
							}}
						>
							<Skeleton width="100%">
								<Box sx={{ height: '400px' }}>
									<img src={collectionInfo?.uri} alt="banner" />
								</Box>
							</Skeleton>

							<Box
								sx={{
									position: 'absolute',
									left: '50%',
									bottom: '0px',
									transform: 'translateX(-50%)',
									border: '2px solid #fff',
									borderRadius: '10px',
									img: {
										width: '100px',
										height: '100px',
										objectFit: 'cover',
										objectPosition: 'center',
										borderRadius: '10px',
									},
								}}
							>
								<Skeleton width="100%">
									<Box sx={{ width: '100px', height: '100px' }}>
										<img src={collectionInfo?.uri} alt="avatar" />
									</Box>
								</Skeleton>
							</Box>
						</Box>
					</>
				) : (
					<>
						{' '}
						<Box
							sx={{
								position: 'relative',
								display: 'flex',
								justifyContent: 'center',
								'& > img': {
									width: '100%',
									objectFit: 'cover',
									objectPosition: 'center',
									height: innerHeight,
									cursor: 'pointer',
								},
							}}
						>
							<ClickAwayListener onClickAway={handleClickAway}>
								<img
									src={collectionInfo?.uri}
									alt="banner"
									onClick={() => {
										setViewFull(true);
									}}
								/>
							</ClickAwayListener>

							<Box
								sx={{
									position: 'absolute',
									left: '50%',
									bottom: '-60px',
									transform: 'translateX(-50%)',
									border: '2px solid #fff',
									borderRadius: '10px',
									img: {
										width: '120px',
										height: '120px',
										objectFit: 'cover',
										objectPosition: 'center',
										borderRadius: '10px',
										display: 'block',
									},
								}}
							>
								<ClickAwayListener onClickAway={handleClickAvatar}>
									<img
										src={collectionInfo?.uri}
										alt="avatar"
										onClick={() => {
											setViewAvatar(true);
										}}
									/>
								</ClickAwayListener>
							</Box>
						</Box>
					</>
				)}

				<Box pt={8} sx={{ maxWidth: '1440px', mx: 'auto', textAlign: 'center' }}>
					<Box sx={{ width: '100%' }}>
						<Typography variant="h4" fontWeight="500">
							{collection}
						</Typography>
						<Stack
							direction="row"
							alignItems="center"
							justifyContent="center"
							gap={1}
							sx={{
								background: '#fff',
								padding: '8px 32px',
								width: 'fit-content',
								mx: 'auto',
								mt: 2,
								border: '1.5px solid #E7E8EC',
								borderRadius: '12px',
								img: {
									width: '24px',
								},
							}}
						>
							<img src={aptos} alt="aptos" />
							<Box>
								{creator?.slice(0, 6) +
									'...' +
									creator?.slice(creator.length - 4, creator.length)}
							</Box>
						</Stack>
					</Box>
					<Typography sx={{ maxWidth: '80%', marginX: 'auto', marginTop: '16px' }}>
						{collectionInfo?.description}
					</Typography>
					<Box py={4}>
						<Grid container maxWidth="1440px" mx="auto" spacing={1} px={2}>
							{loadingItem ? (
								<>
									{arr.map((item, idx) => (
										<SkeletonCardNft key={idx} />
									))}
								</>
							) : (
								<>
									{items?.map((item: any, index: any) => (
										<CardNFTUser
											item={item}
											handleItems={handleItems}
											index={index}
											key={index}
										/>
									))}
								</>
							)}
						</Grid>
					</Box>
				</Box>
			</Box>

			<Box
				sx={{
					position: 'fixed',
					display: viewFull ? '' : 'none',
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
					zIndex: 9999,
					background: 'rgba(0,0,0,0.4)',
				}}
			>
				<Box
					sx={{
						position: 'absolute',
						left: '50%',
						top: '50%',
						transform: 'translate(-50%, -50%)',
						width: '70%',
						img: {
							width: '100%',
							height: '100%',
						},
					}}
				>
					<img src={collectionInfo?.uri} alt="banner" />
				</Box>
			</Box>
			<Box
				sx={{
					position: 'fixed',
					display: viewAvatar ? '' : 'none',
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
					zIndex: 9999,
					background: 'rgba(0,0,0,0.4)',
				}}
			>
				<Box
					sx={{
						position: 'absolute',
						left: '50%',
						top: '50%',
						transform: 'translate(-50%, -50%)',
						width: '50%',
						img: {
							width: '100%',
							height: '100%',
						},
					}}
				>
					<img src={collectionInfo?.uri} alt="banner" />
				</Box>
			</Box>
		</>
	);
};

export default MyCollectionDetail;
