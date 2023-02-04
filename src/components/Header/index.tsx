/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
// mui
import { Box, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import IconColectibles from 'assets/icons/NavBar/icon-colectibles.svg';
import IconArt from 'assets/icons/NavBar/icon-art.svg';
import IconMusic from 'assets/icons/NavBar/icon-music.svg';
import IconSports from 'assets/icons/NavBar/icon-sports.svg';
import IconDomainNames from 'assets/icons/NavBar/icon-domain.svg';
import IconTradingCards from 'assets/icons/NavBar/icon-trading.svg';
import IconEsports from 'assets/icons/NavBar/icon-esports.svg';
import IconRankings from 'assets/icons/icon-rankings.svg';
import IconTopTrader from 'assets/icons/icon-top-trader.svg';
import IconEvent from 'assets/icons/NavBar/icon-event.svg';
import IconDrops from 'assets/icons/NavBar/icon-drops.svg';
import IconXmas from 'assets/icons/NavBar/icon-xmas.svg';
import IconAution from 'assets/icons/NavBar/auction.svg';
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
import {
	AppbarHeader,
	LogoLink,
	PageLogo,
	IconItem,
	LinkWrapper,
	DropDownContent,
	DropdownMenu,
	DropdownMenuLink,
	NavLinkBigScreen,
	NavigationBarBigScreen,
	NavigationItemBigScreen,
} from './styled';
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

const listCategoryMarketplace = [
	// {
	// 	id: 0,
	// 	title: 'NFTs Space',
	// 	target: '_self',
	// 	link: `#${PATH_VIEWALL.root}`,
	// 	isFilter: false,
	// 	icon: IconNftspace,
	// },
	{
		id: 0,
		title: 'Collectible',
		target: '_self',
		link: `/#/view-all/collections/`,
		isFilter: false,
		icon: IconColectibles,
	},
	{
		id: 1,
		title: 'Art',
		target: '_self',
		link: `/#/view-all/collections/`,
		isFilter: true,
		icon: IconArt,
	},
	{
		id: 2,
		title: 'Music',
		target: '_self',
		link: `/#/view-all/collections/`,
		isFilter: true,
		icon: IconMusic,
	},
	{
		id: 5,
		title: 'Sport',
		target: '_self',
		link: `/#/view-all/collections/`,
		isFilter: true,
		icon: IconSports,
	},
	{
		id: 1,
		title: 'Domain Name',
		target: '_self',
		link: `/#/view-all/collections/`,
		isFilter: false,
		icon: IconDomainNames,
	},
	{
		id: 8,
		title: 'Trading Card',
		target: '_self',
		link: `/#/view-all/collections/`,
		isFilter: true,
		icon: IconTradingCards,
	},
	{
		id: 4,
		title: 'Esport',
		target: '_self',
		link: `/#/view-all/collections/`,
		isFilter: true,
		icon: IconEsports,
	},
];
const listNav = [
	{
		id: 1,
		name: 'Explore',
		link: '/',
	},
	{
		id: 2,
		name: 'Drops',
		link: '/drop',
	},
	{
		id: 3,
		name: 'Create',
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
	const { network, wallet } = useWallet();

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
								<NavigationBarBigScreen>
									<NavigationItemBigScreen sx={{ width: '165px' }}>
										<NavLinkBigScreen
											className="navLink"
											href={`/#/`}
											target="_self"
											// onClick={(e: any) => {
											// 	e.preventDefault();
											// }}
										>
											<Typography
												variant="body1"
												fontStyle="italic"
												fontWeight="500"
											>
												Explore
											</Typography>
										</NavLinkBigScreen>

										<DropdownMenu
											className="dropdownMenu"
											sx={{ minWidth: '165px' }}
										>
											<Stack>
												{listCategoryMarketplace.map(
													(category: any, index: number) => (
														<DropdownMenuLink
															href={
																category.isFilter
																	? category.link +
																	  '?category=' +
																	  category.id
																	: category.link
															}
															key={index}
														>
															<Stack
																direction="row"
																alignItems="center"
															>
																<Box width="30px">
																	<img
																		style={{
																			width: '100%',
																			height: '100%',
																			boxShadow:
																				'2px 2px 2px 0 rgba(0,0,0,0.2)',
																			borderRadius: '50%',
																		}}
																		src={category.icon}
																		alt={category.title}
																	/>
																</Box>
																<Typography
																	variant="body2"
																	sx={{ padding: '0 0 0 8px' }}
																	textAlign="center"
																	noWrap
																	fontStyle="italic"
																>
																	{category.title}
																</Typography>
															</Stack>
														</DropdownMenuLink>
													)
												)}
											</Stack>
										</DropdownMenu>
									</NavigationItemBigScreen>
									<NavigationItemBigScreen sx={{ width: '165px' }}>
										<NavLinkBigScreen
											className="navLink"
											href={`#/collection/trending`}
											target="_self"
											// onClick={(e: any) => {
											// 	e.preventDefault();
											// }}
										>
											<Typography
												variant="body1"
												fontStyle="italic"
												fontWeight="500"
											>
												Stats
											</Typography>
										</NavLinkBigScreen>

										<DropdownMenu
											className="dropdownMenu"
											sx={{ minWidth: '165px' }}
										>
											<Stack>
												<DropdownMenuLink href={'#/collection/trending'}>
													<Stack direction="row" alignItems="center">
														<Box width="30px">
															<img
																style={{
																	width: '100%',
																	height: '100%',
																	boxShadow:
																		'2px 2px 2px 0 rgba(0,0,0,0.2)',
																	borderRadius: '50%',
																}}
																src={IconRankings}
																alt={'category.title'}
															/>
														</Box>
														<Typography
															variant="body2"
															sx={{ padding: '0 0 0 8px' }}
															textAlign="center"
															noWrap
															fontStyle="italic"
														>
															Top Collections
														</Typography>
													</Stack>
												</DropdownMenuLink>
											</Stack>
											<Stack>
												<DropdownMenuLink
													href={`/#/top-trader`}
													// key={index}
												>
													<Stack direction="row" alignItems="center">
														<Box width="30px">
															<img
																style={{
																	width: '100%',
																	height: '100%',
																	boxShadow:
																		'2px 2px 2px 0 rgba(0,0,0,0.2)',
																	borderRadius: '50%',
																}}
																src={IconTopTrader}
																alt={'Top trader'}
															/>
														</Box>
														<Typography
															variant="body2"
															sx={{ padding: '0 0 0 8px' }}
															textAlign="center"
															noWrap
															fontStyle="italic"
														>
															Top traders
														</Typography>
													</Stack>
												</DropdownMenuLink>
											</Stack>
										</DropdownMenu>
									</NavigationItemBigScreen>
									<NavigationItemBigScreen
										sx={{ width: '165px' }}
										title="coming soon"
									>
										<NavLinkBigScreen
											className="navLink"
											// href={`/#${PATH_MARKETPLACE.root}`}
											// target="_self"
											// onClick={(e: any) => {
											// 	e.preventDefault();
											// }}
										>
											<Typography
												variant="body1"
												fontStyle="italic"
												fontWeight="500"
											>
												Drops
											</Typography>
										</NavLinkBigScreen>
									</NavigationItemBigScreen>
									<NavigationItemBigScreen sx={{ width: '165px' }}>
										<NavLinkBigScreen
											className="navLink"
											href={'/#/mint'}
											target="_self"
											// onClick={(e: any) => {
											// 	e.preventDefault();
											// }}
										>
											<Typography
												variant="body1"
												fontStyle="italic"
												fontWeight="500"
											>
												Create
											</Typography>
										</NavLinkBigScreen>
									</NavigationItemBigScreen>
								</NavigationBarBigScreen>
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
												<DropDownContent ref={ref} sx={{ padding: '10px' }}>
													{listNav.map((item) => (
														<NavBarMobile
															item={item}
															key={item.id}
															listCategoryMarketplace={
																listCategoryMarketplace
															}
														/>
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
														href="https://metaspacecynfts.medium.com/setting-up-and-using-your-martian-wallet-89f887128e5c"
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
															I don't have a crypto wallet
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
									{modalWalletSteps.steps.thirdModal && userAddress && (
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
