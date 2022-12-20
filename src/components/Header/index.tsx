/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
// mui
import { Box, Link, Stack, Typography, useTheme } from '@mui/material';
import ClickAwayListener from '@mui/base/ClickAwayListener';

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
import LogoMSWhite from '../../assets/images/logo/Metaspacecy-white.webp';
import LogoMSMobileWhite from '../../assets/images/logo/MSMobile-white.webp';
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
	let [background, setBackground] = useState(false);
	let [option, setOption] = useState(false);

	const listNav = [
		{
			id: 1,
			name: 'Home',
			link: '/',
		},
		{
			id: 2,
			name: 'Xmas',
			link: '',
		},
		{
			id: 3,
			name: 'How To Join',
			link: '',
		},
	];
	const renderListNav = () => {
		return listNav.map((item) => {
			return (
				<Box key={item.id}>
					<Link
						href={item.link}
						sx={{ textDecoration: 'none', color: '#fff', fontWeight: '500' }}
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
						sx={{ textDecoration: 'none', color: '#fff', fontWeight: '500' }}
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
								href="/"
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
								{modalWalletSteps.steps.firstModal && (
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
