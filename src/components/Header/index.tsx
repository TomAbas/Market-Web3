/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, Fragment, useRef } from 'react';
// mui
import { Box, Link, Stack, Typography, useTheme } from '@mui/material';
//components
// import MoreOptionList from "components/Layouts/MoreOptionList";
// import MainNavBar from "../MainNavBar";
// import SwitchNetwork from "../SwitchNetwork";
// import PlatformToken from "../PlatformToken";
// import ConnectToWallet from "../ConnectToWallet";
// import PersonalAccount from "../PersonalAccount";
//redux
import { useSelector } from 'react-redux';
// import { selectAddress } from "redux/slices/web3InfoSlice";
// import { selectUser } from "redux/slices/userSlice";
//styled
import {
	AppbarHeader,
	FixedBottomHeader,
	LogoLink,
	MainNavBarWrapper,
	ModalClose,
	NotiBox,
	PageLogo,
	IconItem,
	LinkWrapper,
	DropDownContent,
} from './styled';
//models
// import { User } from 'models';
//image
import LogoMSBlue from '../../assets/images/logo/MSMobile-blue.webp';
import LogoMSWhite from '../../assets/images/logo/Metaspacecy-white.webp';
import LogoMSMobileBlue from '../../assets/images/logo/Metaspacecy-blue.svg';
import LogoMSMobileWhite from '../../assets/images/logo/MSMobile-white.webp';
import LogoMSGray from '../../assets/images/logo/logo-metaspacecy-gray.webp';
import LogoMSGrayMoblie from '../../assets/images/logo/logo-metaspacecy-gray-moblie.webp';
import connectIcon from '../../assets/icons/icon-connect-white.svg';
import metamask from '../../assets/icons/metamask.svg';

//

// import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
	let ref: any = useRef();
	const theme = useTheme();
	const isLightTheme = theme.palette.mode === 'dark';
	// useState
	const [isOpenWallet, setIsOpenWallet] = useState<any>(false);
	let [open, setOpen] = useState(true);
	let [background, setBackground] = useState(false);
	let [turnOfConnectWallet, setTurnOfConnectWallet] = useState(true);
	let [turnOfSwitchNetwork, setTurnOfSwitchNetwork] = useState(true);
	let [userAddress, setUserAddress] = useState<string>('');

	let [openConnect, setOpenConnect] = useState(false);

	const listNav = [
		{
			id: 1,
			name: 'Home',
			link: '/',
		},
		{
			id: 2,
			name: 'Xmas',
			link: '/',
		},
		{
			id: 3,
			name: 'How to join',
			link: '/',
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
				<Box ref={ref}>
					<Stack
						direction="row"
						sx={{
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<PageLogo>
							<LogoLink
								href="https://metaspacecy.com/"
								sx={{
									img: {
										height: 50,
										minWidth: '211.65px',
										width: 'auto',
										[theme.breakpoints.down(651)]: {
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
							sx={{
								flexDirection: 'row',
								gap: '100px',
								'@media (max-width: 800px)': {
									gap: '50px',
								},
								'@media (max-width: 500px)': {
									gap: '20px',
								},
							}}
						>
							{renderListNav()}
						</Stack>
						{/* <IconItem onClick={() => setOpenConnect(true)}>
              <img src={connectIcon} alt="connect icon" />
              {openConnect ? (
                <DropDownContent ref={ref}>
                  <Box
                    sx={{
                      width: "350px",
                    }}
                    p={4}
                  >
                    <Box>
                      <Typography
                        variant="h4"
                        fontStyle="italic"
                        style={{
                          textAlign: "center",
                          marginBottom: "20px",
                          fontFamily: "Montserrat, san-serif",
                        }}
                      >
                        Connect wallet
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight="400"
                        sx={{
                          fontFamily: "Montserrat, san-serif",
                          [theme.breakpoints.down(500)]: {
                            fontSize: "13px",
                          },
                        }}
                        color="#fff"
                        fontSize="16px"
                        fontStyle="italic"
                      >
                        Use any existing crypto wallet to connect to Metaspacecy
                      </Typography>
                    </Box>
                    <Box pt={2}>
                      <Stack direction="row" gap="20px" alignItems="center">
                        <Box
                          sx={{
                            width: "60px",
                            img: {
                              width: "100%",
                              height: "auto",
                            },
                          }}
                        >
                          <img src={metamask} alt="metamask" />
                        </Box>
                        <Typography
                          variant="body2"
                          fontWeight="400"
                          sx={{
                            fontFamily: "Montserrat, san-serif",
                            [theme.breakpoints.down(500)]: {
                              fontSize: "13px",
                            },
                          }}
                          color="#fff"
                          fontSize="16px"
                          fontStyle="italic"
                        >
                          Metamask
                        </Typography>
                      </Stack>
                    </Box>
                    <Box pt={2}>
                      <LinkWrapper
                        href="https://metaspacecy.gitbook.io/metaspacecy/getting-started/installing-a-wallet"
                        target="_blank"
                      >
                        <Typography
                          variant="body2"
                          fontWeight="400"
                          sx={{
                            fontFamily: "Montserrat, san-serif",
                            [theme.breakpoints.down(500)]: {
                              fontSize: "13px",
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
              ) : // <DropDownContent ref={ref}>
              //   <Box p={3}>
              //     <Typography
              //       variant="body2"
              //       fontWeight="400"
              //       sx={{
              //         fontFamily: "Montserrat, san-serif",
              //         [theme.breakpoints.down(500)]: {
              //           fontSize: "13px",
              //         },
              //       }}
              //       color="#fff"
              //       fontSize="16px"
              //       fontStyle="italic"
              //     >
              //       0xcDb2fb511E9a705ca7EBAff481e76da5f3435969
              //     </Typography>
              //   </Box>
              // </DropDownContent>
              null}
            </IconItem> */}
					</Stack>
				</Box>
				{/* Fixed Header */}
			</AppbarHeader>
			{/* {address && userInfo && ( */}
		</>
	);
};
export default React.memo(Header);
