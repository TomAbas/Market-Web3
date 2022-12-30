/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
// mui
import { Box, Link, Stack, Typography, useTheme } from '@mui/material';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { walletClient } from '../../utils/aptos';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useWallet, Wallet } from '@manahippo/aptos-wallet-adapter';
//redux
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
	sellectStepsModalWallet,
	openFirstModal,
	openSecondModal,
	closeModal,
} from '../../redux/slices/modalWallet';
//styled
import { AppbarHeader, LogoLink, PageLogo, IconItem, LinkWrapper, DropDownContent } from './styled';
//models
//image
import LogoMSWhite from '../../assets/images/logo/logoMetaBlue.png';
import LogoMSMobileWhite from '../../assets/images/logo/logoMetaBlue.png';
import LogoMSGray from '../../assets/images/logo/logo-metaspacecy-gray.webp';
import LogoMSGrayMoblie from '../../assets/images/logo/logo-metaspacecy-gray-moblie.webp';
import connectIcon from '../../assets/icons/icon-connect-white.svg';
import binance from '../../assets/wallet/bnb-new.webp';
import ModalWallet from '../ModalWallet';
import { selectUser, selectWeb3 } from '../../redux/slices/userInfo';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
//hooks
import { useUserInfo } from '../../redux/actions/userAction';
import { TOKEN_PAYMENT } from 'constants/token.constant';

import { useSizeObersver } from '../../contexts/SizeObserver';

const Header: React.FC = () => {
	const modalWalletSteps = useAppSelector(sellectStepsModalWallet);
	const userInfo = useAppSelector(selectUser);
	const userAddress = userInfo?.userAddress;
	const userBalance = userInfo?.balance;
	const web3Info = useAppSelector(selectWeb3);
	const chainId = web3Info.chainId;
	const dispatch = useAppDispatch();
	let ref: any = useRef();
	const theme = useTheme();
	const isLightTheme = theme.palette.mode === 'dark';
	const { innerWidth } = useSizeObersver();
	useUserInfo();
	// useState
	// const getBalanceUser = async (address: any): Promise<number> => {
	// 	// console.log(address);
	// 	let balance = await walletClient.getBalance(address);
	// 	return balance;
	// };
	const { account } = useWallet();
	let myAddress = account?.address?.toString();
	let myBalance = 0;
	// const fetchBalance = async () => {
	// 	try {
	// 		let balance: number = await getBalanceUser(account?.address);
	// 		myBalance = balance;
	// 	} catch (error) {
	// 		return 0;
	// 	}
	// };
	if (myAddress) {
		myAddress =
			myAddress.slice(0, 6) + '...' + myAddress.slice(myAddress.length - 4, myAddress.length);
		// fetchBalance();
	}
	let [background, setBackground] = useState(false);
	let [option, setOption] = useState(false);

	const listNav = [
		{
			id: 1,
			name: 'Marketplace',
			link: '#',
		},
		{
			id: 2,
			name: 'Drop',
			link: '#xmas',
		},
		{
			id: 3,
			name: 'Mint',
			link: '#join',
		},
	];
	const renderListNav = () => {
		return listNav.map((item) => {
			return (
				<Box key={item.id}>
					<Link
						href={item.link}
						sx={{
							textDecoration: 'none',
							color: '#131740',
							fontWeight: '500',
							transition: 'all 0.4s ',
							'&:hover': {
								color: '#007aff',
							},
						}}
					>
						{item.name}
					</Link>
				</Box>
			);
		});
	};
	const renderListNavMobile = () => {
		return listNav.map((item) => {
			return (
				<Box key={item.id} px={4} py={2}>
					<Link
						href={item.link}
						sx={{
							textDecoration: 'none',
							color: '#131740',
							fontWeight: '500',
							transition: 'all 0.4s ',
							'&:hover': {
								color: '#007aff',
							},
						}}
					>
						{item.name}
					</Link>
				</Box>
			);
		});
	};
	const openModal = () => {
		if (!userAddress) {
			dispatch(openFirstModal());
		} else {
			dispatch(openSecondModal());
		}
	};
	const openMoreOption = () => {
		setOption(!option);
	};
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
						sx={{ justifyContent: 'space-between', alignItems: 'center' }}
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
						{innerWidth > 730 ? (
							<Stack sx={{ flexDirection: 'row', gap: '60px' }}>
								{renderListNav()}
							</Stack>
						) : null}

						<Stack direction="row" gap="10px">
							{innerWidth < 730 ? (
								<IconItem>
									<MoreHorizOutlinedIcon
										sx={{
											width: '34px',
											position: 'absolute',
											top: '6px',
											color: 'white',
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
												{renderListNavMobile()}
											</DropDownContent>
										</ClickAwayListener>
									)}
								</IconItem>
							) : null}
							<IconItem onClick={openModal}>
								<img src={connectIcon} alt="connect icon" />
								{modalWalletSteps.steps.firstModal && !account?.address && (
									<ClickAwayListener
										onClickAway={() => {
											dispatch(closeModal());
										}}
									>
										<DropDownContent ref={ref}>
											<Box
												sx={{
													width: '330px',
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
														color="#fff"
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
															color="#fff"
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
								{account?.address && (
									<>
										<PopupState variant="popover" popupId="demo-popup-menu">
											{(popupState) => (
												<React.Fragment>
													<Button
														variant="contained"
														{...bindTrigger(popupState)}
														sx={{
															boxShadow: '0',
															':hover': {
																backgroundColor: 'white',
															},
														}}
													>
														<img
															src="../../assets/navbar/icon-user-black_3.svg"
															alt="Wallet"
															width={20}
															height={20}
														/>
													</Button>
													<Menu {...bindMenu(popupState)}>
														<MenuItem onClick={popupState.close}>
															<img
																src="https://i.pinimg.com/736x/25/47/c7/2547c7ecb55605fbb39e04157f157021.jpg"
																alt="Wallet"
																width={50}
																height={50}
															/>
															&emsp; {myAddress}
														</MenuItem>
														<MenuItem onClick={popupState.close}>
															APT &emsp;&emsp; {myBalance / 100000000}{' '}
															APT
														</MenuItem>
														<MenuItem onClick={popupState.close}>
															<a
																href="/profile"
																style={{
																	color: 'black',
																}}
															>
																Profile
															</a>
														</MenuItem>
														<MenuItem onClick={popupState.close}>
															My Collections
														</MenuItem>
														<MenuItem onClick={popupState.close}>
															Settings
														</MenuItem>
														<MenuItem onClick={popupState.close}>
															Logout
														</MenuItem>
													</Menu>
												</React.Fragment>
											)}
										</PopupState>
									</>
								)}
								{modalWalletSteps.steps.secondModal && (
									<ClickAwayListener
										onClickAway={() => {
											dispatch(closeModal());
										}}
									>
										<DropDownContent ref={ref}>
											<Box p={2}>
												<Typography
													variant="body2"
													fontWeight="400"
													sx={{
														textAlign: 'center',
														fontFamily: 'Montserrat, san-serif',
														[theme.breakpoints.down(500)]: {
															fontSize: '13px',
														},
													}}
													color="#fff"
													fontSize="16px"
													fontStyle="italic"
												>
													{userAddress?.substring(0, 10)} ...{' '}
													{userAddress?.substring(
														37,
														userAddress.length + 1
													)}{' '}
												</Typography>
											</Box>
											<Stack direction="column" gap="16px">
												<Stack
													direction="row"
													justifyContent="center"
													alignItems="center"
													sx={{ marginBottom: '10px' }}
												>
													<Stack
														direction="row"
														gap="10px"
														alignItems="center"
														sx={{
															img: {
																width: '32px',
															},
														}}
													>
														<img src={binance} alt="bnb" />
														<Box>{userBalance}</Box>
														<Box>
															{TOKEN_PAYMENT[chainId][0].symbol}
														</Box>
													</Stack>
												</Stack>
											</Stack>
										</DropDownContent>
									</ClickAwayListener>
								)}
							</IconItem>
						</Stack>
					</Stack>
				</Box>
			</AppbarHeader>
		</>
	);
};
export default React.memo(Header);
