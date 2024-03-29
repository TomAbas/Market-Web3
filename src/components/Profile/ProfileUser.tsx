/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, ClickAwayListener, Grid, Stack, Typography, useTheme } from '@mui/material';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import aptos from '../../assets/images/card/aptos.jpg';
import { useSizeObersver } from 'contexts/SizeObserver';
import editIcon from '../../assets/icons/icon-edit.svg';
import SettingInfoUser from 'components/SettingInfoUser/SettingInfoUser';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectSettingModal, selectUser, toggleSettingModalA } from 'redux/slices/userInfo';
import EditInfoUser from 'components/EditInfoUser/EditInfoUser';
import { nftItem } from 'models/item';
import { getListItemF, getUserInfo } from 'api/userApi';
import { getUserItem } from 'api/items/itemsApi';
import CardNFT from 'components/Marketplace/CardNFT';
import useInteraction from 'hooks/useInteraction';
import { handleReset, selectTrigger } from 'redux/slices/nftFilter';
import SkeletonCardNft from 'components/Skeletons/SkeletonCardNft';
import TabUserInfo from './TabUserInfo/TabUserInfo';
import useFilterItem from 'hooks/useFilterItem';
import SkeletonTopProfile from 'components/Skeletons/SkeletonTopProfile/SkeletonTopProfile';
import checkicon from 'assets/icons/icon-check.svg';
import useTransfer from 'utils/transfer';
const ProfileUser = () => {
	const theme = useTheme();
	const bioRef: any = useRef();
	const { checkEnableReceivingNFT, enableReceivingNFT } = useTransfer();
	const [searchParams, setSearchParams] = useSearchParams();
	const address = searchParams.get('address');
	const dispatch = useAppDispatch();
	const [show, setShow] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const { innerWidth } = useSizeObersver();
	const [viewFull, setViewFull] = useState(false);
	const [viewAvatar, setViewAvatar] = useState(false);
	const innerHeight = innerWidth / 4.5;
	const innerHeightMobi = innerWidth / 2;
	let myInfo = useAppSelector(selectUser);
	const [infoUser, setInfoUser] = useState<any>();
	const [items, setItems] = useState<nftItem[]>([]);
	const { itemsDisplay } = useFilterItem(items, infoUser);
	const [itemsF, setItemsF] = useState<nftItem[]>([]);
	const isSettingModal = useAppSelector(selectSettingModal);
	const [isLoading, setIsLoading] = useState(true);
	const trigger = useAppSelector(selectTrigger);
	const [isEnableReceivingNFT, setIsEnableReceivingNFT] = useState(true);
	const handleClickAway = () => {
		setViewFull(false);
	};
	const handleClickAvatar = () => {
		setViewAvatar(false);
	};
	const openEditModal = () => {
		setOpenEdit(true);
	};
	const closeEditModal = () => {
		setOpenEdit(false);
	};
	const handleToggleModalSetting = () => {
		dispatch(toggleSettingModalA());
	};
	async function fetchData(userAddress: string) {
		setInfoUser((await getUserInfo(userAddress)).data.data);
	}
	async function fetchItems(userAddress: string) {
		let items = (await getUserItem('2', userAddress)).data;
		await fetchItemsF(userAddress);
		setItems(items);
		setIsLoading(false);
	}
	async function fetchItemsF(userAddress: string) {
		setItemsF((await getListItemF(userAddress)).data);
	}

	function handleClickEnable() {
		enableReceivingNFT(infoUser.userAddress).then((res) => {
			setIsEnableReceivingNFT(true);
		});
	}
	useEffect(() => {
		if (address) {
			fetchData(address);
		} else {
			setInfoUser(myInfo);
		}
	}, [address, myInfo]);

	useEffect(() => {
		if (infoUser) {
			fetchItems(infoUser.userAddress);
			checkEnableReceivingNFT(infoUser.userAddress).then((res) => {
				setIsEnableReceivingNFT(res);
			});
		}
		return () => {
			dispatch(handleReset());
		};
	}, [infoUser, trigger]);
	return (
		<>
			<Box pt={13}>
				{infoUser ? (
					<>
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
									[theme.breakpoints.down('md')]: {
										height: innerHeightMobi,
									},
								},
							}}
						>
							<ClickAwayListener onClickAway={handleClickAway}>
								<img
									src={infoUser?.background}
									alt="banner"
									onClick={() => {
										setViewFull(true);
									}}
								/>
							</ClickAwayListener>
							<ClickAwayListener onClickAway={handleClickAvatar}>
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
											cursor: 'pointer',
										},
									}}
								>
									<>
										<Box sx={{ position: 'relative' }}>
											<img
												src={infoUser?.avatar}
												alt="avatar"
												onClick={() => {
													setViewAvatar(true);
												}}
											/>
											{isEnableReceivingNFT && (
												<Box
													sx={{
														position: 'absolute',
														bottom: '0',
														right: '0',
														borderRadius: '50%',
														transform: 'translate(50%, 50%)',
													}}
												>
													<img
														src={checkicon}
														alt="icon verified"
														style={{ width: '100%', height: 'auto' }}
													/>
												</Box>
											)}
										</Box>
									</>
								</Box>
							</ClickAwayListener>
							<Box
								sx={{
									position: 'absolute',
									right: '30px',
									bottom: '20px',
									button: {
										padding: '10px 30px',
										border: '1.5px solid #e7e8ec',
										transition: 'all 0.4s',
										borderRadius: '12px',
										fontWeight: 500,
										background: 'rgba(157, 195, 230, 0.6)',
										fontSize: '16px',
										cursor: 'pointer',
										fontFamily: 'Montserrat, sans-serif !important',
										fontStyle: 'italic !important',
										// width: '100px',
										// maxWidth: '180px',
										color: '#fff',
										'&:hover': {
											background: '#9DC3E6',
											borderColor: 'transparent',
										},
										img: {
											width: '20px',
										},
										display: 'flex',
										alignItems: 'center',
										gap: '6px',
									},
									[theme.breakpoints.down(1200)]: {
										left: 0,
										right: 0,
										padding: ' 5px 10px',
										button: {
											padding: '5px 10px',
											minWidth: '150px',
										},
									},
									[theme.breakpoints.down(600)]: {
										left: 0,
										right: 0,
										padding: ' 5px 10px',
										button: {
											padding: '5px 10px',
											minWidth: '100px',
										},
									},
								}}
							>
								{/* <img src={infoUser?.avatar} alt="avatar" /> */}
								{!address && (
									<Stack
										spacing={2}
										direction={'row'}
										justifyContent={{ xs: 'space-between', lg: 'unset' }}
									>
										{!isEnableReceivingNFT && (
											<button onClick={handleClickEnable}>
												{/* <img src={editIcon} alt="edit" /> */}
												<Typography
													sx={{
														[theme.breakpoints.down('sm')]: {
															fontSize: '0.5rem',
														},
													}}
												>
													Enable Receiving NFT
												</Typography>
											</button>
										)}
										<button onClick={openEditModal}>
											<img src={editIcon} alt="edit" />
											<Typography
												sx={{
													[theme.breakpoints.down('sm')]: {
														fontSize: '0.5rem',
													},
												}}
											>
												Edit Profile
											</Typography>
										</button>
									</Stack>
								)}
							</Box>
						</Box>
						<Box pt={8} sx={{ maxWidth: '1440px', mx: 'auto' }}>
							<Box sx={{ width: '100%', textAlign: 'center' }}>
								<Typography variant="h4" fontWeight="500">
									{infoUser?.username}
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
										{infoUser?.userAddress.slice(0, 6) +
											'...' +
											infoUser?.userAddress.slice(
												infoUser.userAddress.length - 4,
												infoUser.userAddress.length
											)}
									</Box>
								</Stack>
								<Typography
									variant="body1"
									mt={2}
									ref={bioRef}
									sx={{
										transition: 'max-height 0.5s ease-in-out ',
										margin: '16px auto',
										padding: '0px 24px',
										width: '100%',
										textOverflow: 'ellipsis',
										wordWrap: 'break-word',
										whiteSpace: `${show ? 'unset' : 'nowrap'}`,
										maxHeight: `${show ? '500px' : '49px'}`,
										height: `${show ? 'auto' : '49px'}`,
										textAlign: ` ${show ? 'center' : 'center'}`,
										overflow: 'hidden',
									}}
									onClick={() => {
										if (bioRef.current?.offsetHeight < 45) {
											return;
										}
										setShow(!show);
									}}
								>
									{infoUser?.bio}
								</Typography>
							</Box>
						</Box>
					</>
				) : (
					<SkeletonTopProfile />
				)}
				<Box pb={4} sx={{ maxWidth: '1440px', mx: 'auto' }}>
					<TabUserInfo
						items={itemsDisplay}
						itemsF={itemsF}
						isLoading={isLoading}
						infoUser={infoUser}
					/>
				</Box>
			</Box>

			{infoUser && (
				<SettingInfoUser
					infoUser={infoUser}
					openEditModal={handleToggleModalSetting}
					openEdit={isSettingModal}
				/>
			)}
			{infoUser && (
				<EditInfoUser
					infoUser={infoUser}
					openEditModal={closeEditModal}
					openEdit={openEdit}
				/>
			)}

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
					<img src={infoUser?.background} alt="banner" />
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
					<img src={infoUser?.avatar} alt="banner" />
				</Box>
			</Box>
		</>
	);
};

export default ProfileUser;
