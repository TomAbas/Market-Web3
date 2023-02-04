/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, ClickAwayListener, Grid, Stack, Typography } from '@mui/material';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import CardNFTUser from 'components/Marketplace/CardNFTUser';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTokens } from '../../hooks/useTokens';
import aptos from '../../assets/images/card/aptos.jpg';
import { useSizeObersver } from 'contexts/SizeObserver';
import editIcon from '../../assets/icons/icon-edit.svg';
import SettingInfoUser from 'components/SettingInfoUser/SettingInfoUser';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectSettingModal, selectUser, toggleSettingModalA } from 'redux/slices/userInfo';
import EditInfoUser from 'components/EditInfoUser/EditInfoUser';
import { nftItem } from 'models/item';
import { getUserInfo } from 'api/userApi';

const ProfileUser = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const address = searchParams.get('address');
	const dispatch = useAppDispatch();
	const [openEdit, setOpenEdit] = useState(false);
	const { account } = useWallet();
	const { innerWidth } = useSizeObersver();
	const [viewFull, setViewFull] = useState(false);
	const [viewAvatar, setViewAvatar] = useState(false);
	const { tokens, userNfts } = useTokens(account);
	const [items, setItems] = useState<any[]>([]);
	const innerHeight = innerWidth / 4.5;
	let myInfo = useAppSelector(selectUser);
	const [infoUser, setInfoUser] = useState<any>(myInfo);
	const isSettingModal = useAppSelector(selectSettingModal);
	const handleItems = (index: any) => {
		let newItems = items.filter((_item, i) => i !== index);
		setItems(newItems);
	};
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
		console.log(infoUser);
	}
	useEffect(() => {
		setItems(tokens);
		if (address) {
			fetchData(address);
		}
	}, [tokens, address]);
	return (
		<>
			<Box pt={13}>
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
							src={infoUser?.background}
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
								cursor: 'pointer',
							},
						}}
					>
						<ClickAwayListener onClickAway={handleClickAvatar}>
							<img
								src={infoUser?.avatar}
								alt="avatar"
								onClick={() => {
									setViewAvatar(true);
								}}
							/>
						</ClickAwayListener>
					</Box>
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
								width: '180px',
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
						}}
					>
						{/* <img src={infoUser?.avatar} alt="avatar" /> */}
						{!address && (
							<button onClick={openEditModal}>
								<img src={editIcon} alt="edit" />
								<Box>Edit Profile</Box>
							</button>
						)}
					</Box>
				</Box>
				<Box pt={8} sx={{ maxWidth: '1440px', mx: 'auto', textAlign: 'center' }}>
					<Box sx={{ width: '100%' }}>
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
						<Typography variant="body1" mt={2}>
							{infoUser?.bio}
						</Typography>
					</Box>
					<Box py={4}>
						<Grid container maxWidth="1440px" mx="auto" spacing={1} px={2}>
							{userNfts.map((item: nftItem, index: any) => (
								<CardNFTUser
									item={item}
									handleItems={handleItems}
									index={index}
									key={index}
								/>
							))}
						</Grid>
					</Box>
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
