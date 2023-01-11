/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
// mui
import { Box, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
//redux
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
	sellectStepsModalWallet,
	openFirstModal,
	openSecondModal,
	openThirdModal,
	closeModal,
} from '../../redux/slices/modalWallet';
//styled
import userIcon from '../../assets/icons/icon-user-black.svg';
import { AppbarHeader, LogoLink, PageLogo, IconItem, LinkWrapper, DropDownContent } from './styled';
//image
import LogoMSWhite from '../../assets/images/logo/logoMetaBlue.png';
import LogoMSMobileWhite from '../../assets/images/logo/logoMetaBlue.png';
import LogoMSGray from '../../assets/images/logo/logo-metaspacecy-gray.webp';
import LogoMSGrayMoblie from '../../assets/images/logo/logo-metaspacecy-gray-moblie.webp';
import aptos from '../../assets/images/logo/aptos.png';
import sui from '../../assets/images/logo/sui.png';
import connectIcon from '../../assets/icons/icon-connect-black.svg';
import searchIcon from '../../assets/icons/search.svg';
import ModalWallet from '../ModalWallet';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
//hooks
import { useSizeObersver } from '../../contexts/SizeObserver';
import ModalInfo from './popupInfoModal';
import useLogin from '../../hooks/useLogin';
//component
import NavBar from 'components/NavBar';
import NavBarMobile from 'components/NavBarMobile';
import { loginUser } from 'hooks/useUserLogin';
import { getUserSuccessA } from 'redux/slices/userInfo';

const listNav = [
	{
		id: 1,
		name: 'Marketplace',
		link: '/',
	},
	{
		id: 2,
		name: 'Drop',
		link: '/drop',
	},
	{
		id: 3,
		name: 'Mint',
		link: '/mint',
	},
];
const Header: React.FC = () => {
	const modalWalletSteps = useAppSelector(sellectStepsModalWallet);
	const dispatch = useAppDispatch();
	let ref: any = useRef();
	const theme = useTheme();
	const isLightTheme = theme.palette.mode === 'dark';
	const { innerWidth } = useSizeObersver();
	const { loginSuccess, userAddress } = useLogin();
	let [background, setBackground] = useState(false);
	let [option, setOption] = useState(false);
	const [chainId, setChainId] = useState('Testnet');
	const { network } = useWallet();
	const openModal = () => {
		if (!userAddress) {
			dispatch(openFirstModal());
		} else {
			dispatch(openSecondModal());
		}
	};
	const openModalInfoUser = () => {
		dispatch(openThirdModal());
	};

	const openMoreOption = () => {
		setOption(!option);
	};
	useEffect(() => {
		console.log(network);
		if (network?.name?.toLowerCase() === 'testnet' || network?.name?.toLowerCase() === 'null') {
			setChainId('Testnet');
		} else {
			let a = network?.name;
			if (a) {
				setChainId(a);
			}
		}
	}, [network?.name]);
	useEffect(() => {
		// Handler to call on window scroll
		const handleScroll = () => {
			if (window.pageYOffset > 25) {
				setBackground(true);
			} else {
				setBackground(false);
			}
		};
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => window.removeEventListener('scroll', handleScroll);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<AppbarHeader
				position="fixed"
				color="transparent"
				elevation={0}
				background={background}
				className={background ? 'flurBackground' : ''}
			>
				<Box>
					<Stack
						direction="row"
						sx={{ justifyContent: 'space-between', alignItems: 'center', gap: 3 }}
					>
						<PageLogo>
							<LogoLink
								href="https://metaspacecy.com/"
								sx={{
									img: {
										height: 50,
										minWidth: '211.65px',
										width: 'auto',
										[theme.breakpoints.down(451)]: {
											minWidth: 'unset',
										},
									},
								}}
							>
								{isLightTheme ? (
									<img
										className="logoMobile"
										src={LogoMSGrayMoblie}
										alt="page logo"
									/>
								) : (
									<img
										className="logoMobile"
										src={LogoMSMobileWhite}
										alt="page logo"
									/>
								)}

								{isLightTheme ? (
									<img
										loading="lazy"
										src={LogoMSGray}
										alt="page logo"
										className="logoPC"
									/>
								) : (
									<img
										loading="lazy"
										src={LogoMSWhite}
										alt="page logo"
										className="logoPC"
									/>
								)}
							</LogoLink>
						</PageLogo>
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							gap={3}
							sx={{
								width: '60%',
								'@media (max-width: 1024px)': {
									width: '90%',
								},
							}}
						>
							<Stack
								direction="row"
								alignItems="center"
								gap={1}
								sx={{
									width: '40%',
									boxShadow: 'rgb(0 0 0 / 20%) 2px 3px 2px 0px',
									borderRadius: '10px',
									px: 2,
									py: 1,
									background: '#fff',
									'@media (max-width: 1024px)': {
										width: '100%',
									},
									input: {
										width: '100%',
										border: '0',
										outline: 'none',
										fontStyle: 'italic',
										fontWeight: '500',
									},
									'input::placeholder': {
										fontStyle: 'italic',
										fontWeight: '500',
									},
								}}
							>
								<img src={searchIcon} alt="search" />
								<input type="text" placeholder="Search" />
							</Stack>
							{innerWidth > 1024 ? (
								<Stack sx={{ flexDirection: 'row', gap: '60px' }}>
									{listNav.map((item) => (
										<NavBar item={item} key={item.id} />
									))}
								</Stack>
							) : null}
						</Stack>
						<Stack direction="row" alignItems="center" gap="8px">
							<Stack direction="row" gap="10px">
								{innerWidth < 1024 ? (
									<IconItem>
										<MoreHorizOutlinedIcon
											sx={{
												width: '34px',
												position: 'absolute',
												// top: '6px',
												color: 'black',
											}}
											onClick={() => setOption(true)}
										/>

										{option && (
											<ClickAwayListener
												onClickAway={() => {
													openMoreOption();
												}}
											>
												<DropDownContent ref={ref}>
													{listNav.map((item) => (
														<NavBarMobile item={item} key={item.id} />
													))}
												</DropDownContent>
											</ClickAwayListener>
										)}
									</IconItem>
								) : null}
							</Stack>
							<IconItem onClick={openModal}>
								<img src={connectIcon} alt="connect icon" />
								{modalWalletSteps.steps.firstModal && !userAddress && (
									<ClickAwayListener
										onClickAway={() => {
											openModal();
										}}
									>
										<DropDownContent ref={ref}>
											<Box
												sx={{
													width: '330px',
													boxShadow: 'rgb(0 0 0 / 40%) 0px 0px 5px 0px',
													borderRadius: '12px',
												}}
												p={4}
											>
												<Box>
													<Typography
														variant="h4"
														fontStyle="italic"
														style={{
															textAlign: 'center',
															marginBottom: '20px',
															fontFamily: 'Montserrat, san-serif',
														}}
													>
														Connect wallet
													</Typography>
													<Typography
														variant="body2"
														fontWeight="400"
														sx={{
															fontFamily: 'Montserrat, san-serif',
															[theme.breakpoints.down(500)]: {
																fontSize: '13px',
															},
														}}
														color="#000"
														fontSize="16px"
														fontStyle="italic"
													>
														Use any existing crypto wallet to connect to
														Metaspacecy
													</Typography>
												</Box>
												<ModalWallet />

												<Box pt={2}>
													<LinkWrapper
														href="https://metaspacecy.gitbook.io/metaspacecy/getting-started/installing-a-wallet"
														target="_blank"
													>
														<Typography
															variant="body2"
															fontWeight="400"
															sx={{
																fontFamily: 'Montserrat, san-serif',
																[theme.breakpoints.down(500)]: {
																	fontSize: '13px',
																},
															}}
															color="#000"
															fontSize="16px"
															fontStyle="italic"
														>
															I dont have a crypto wallet
														</Typography>
													</LinkWrapper>
												</Box>
											</Box>
										</DropDownContent>
									</ClickAwayListener>
								)}
								{modalWalletSteps.steps.secondModal && (
									<ClickAwayListener
										onClickAway={() => {
											openModal();
										}}
									>
										<DropDownContent ref={ref}>
											<Box
												sx={{
													width: '260px',
													boxShadow: 'rgb(0 0 0 / 40%) 0px 0px 5px 0px',
													borderRadius: '12px',
												}}
												p={4}
											>
												<Typography
													variant="h5"
													fontStyle="italic"
													fontWeight={500}
													style={{
														textAlign: 'center',
														marginBottom: '20px',
														fontFamily: 'Montserrat, san-serif',
													}}
												>
													Switch Network
												</Typography>
												<Stack
													direction="column"
													justifyContent="space-between"
													sx={{ width: 'fit-content', margin: '0 auto' }}
												>
													<Tooltip
														title={chainId}
														placement="right"
														arrow
													>
														<Stack
															direction="row"
															gap={1}
															alignItems="center"
															sx={{
																cursor: 'pointer',
																background:
																	'rgba(157, 195, 230, 0.537)',
																padding: '4px 12px',
																borderRadius: '10px',
																marginBottom: '15px',
																img: { width: 32 },
															}}
														>
															<img src={aptos} alt="aptos" />
															<Typography variant="body1">
																Aptos
															</Typography>
														</Stack>
													</Tooltip>
													<Tooltip
														title="coming soon"
														placement="right"
														arrow
													>
														<Stack
															direction="row"
															gap={1}
															alignItems="center"
															sx={{
																padding: '4px 12px',
																cursor: 'pointer',
																borderRadius: '10px',
																img: { width: 32 },
															}}
														>
															<img src={sui} alt="sui" />
															<Typography variant="body1">
																Sui
															</Typography>
														</Stack>
													</Tooltip>
												</Stack>
											</Box>
										</DropDownContent>
									</ClickAwayListener>
								)}
							</IconItem>
							{userAddress && (
								<IconItem onClick={openModalInfoUser}>
									<img src={userIcon} alt="model info" />
									{modalWalletSteps.steps.thirdModal &&
										loginSuccess &&
										userAddress && (
											<ClickAwayListener
												onClickAway={() => {
													openModalInfoUser();
												}}
											>
												<DropDownContent ref={ref}>
													<Box
														sx={{
															width: '330px',
															boxShadow:
																'rgb(0 0 0 / 40%) 0px 0px 5px 0px',
															borderRadius: '12px',
														}}
														p={4}
													>
														<ModalInfo userAddress={userAddress} />
													</Box>
												</DropDownContent>
											</ClickAwayListener>
										)}
								</IconItem>
							)}
						</Stack>
					</Stack>
				</Box>
			</AppbarHeader>
		</>
	);
};
export default React.memo(Header);
