/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Link, Stack, Typography } from '@mui/material';
import React from 'react';
import bg1 from '../../assets/images/background/bg1.webp';
import bg2 from '../../assets/images/background/bg2.webp';
import bg3 from '../../assets/images/background/bg3.webp';
import bg4 from '../../assets/images/background/bg4.webp';
import bg5 from '../../assets/images/background/bg5.webp';
import bg7 from '../../assets/images/background/bg7.webp';
import bg6 from '../../assets/images/background/bg6.webp';
import bg8 from '../../assets/images/background/bg8.webp';
import bg9 from '../../assets/images/background/bg9.png';
import slide from '../../assets/images/background/slide.png';
import snowman from '../../assets/images/background/snowman.png';
import xmas from '../../assets/images/background/xmas.webp';
import xmasText from '../../assets/images/background/xmas-text.webp';
import xmasTextttt from '../../assets/images/background/xmasss.webp';
import icon from '../../assets/icons/Icon.svg';
import star from '../../assets/icons/Star.svg';
import check from '../../assets/icons/check.svg';
import Slider from '../Slider';
import gif from '../../assets/images/background/gif-qua-noel.gif';
import item1 from '../../assets/icons/1.svg';
import item2 from '../../assets/icons/2.svg';
import item3 from '../../assets/icons/3.svg';
import item4 from '../../assets/images/background/item1.png';
import item5 from '../../assets/images/background/item2.png';

import TwitterWhite from 'assets/icons/twitter-white.svg';
import DiscordWhite from 'assets/icons/discord-white.svg';
import { PATH_SOCIAL } from 'routes/path';

export default function ChristmasTree() {
	return (
		<Box sx={{ fontStyle: 'italic !important' }}>
			<Box
				sx={{
					position: 'relative',
					'& > img': {
						width: '100%',
						height: '100vh',
						objectFit: 'cover',
						objectPosition: 'bottom',
						display: 'block',
					},
				}}
			>
				<img src={xmas} alt="xmas" />
				<Box
					sx={{
						position: 'absolute',
						bottom: '60px',
						left: '50%',
						transform: 'translateX(-50%)',

						'@media (max-width: 1100px)': {
							width: '100%',
						},
					}}
				>
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="center"
						gap="40px"
						px={4}
						sx={{
							'@media (max-width: 1100px)': {
								flexDirection: 'column',
							},
						}}
					>
						<Box
							sx={{
								img: {
									width: '70vw',
									height: 'auto',
									'@media (max-width: 1100px)': {
										width: '100%',
										height: 'auto',
									},
								},
							}}
						>
							<img src={xmasText} alt="xmas" />
						</Box>
						<Box
							sx={{
								button: {
									padding: '10px 30px',
									border: '1.5px solid #e7e8ec',
									transition: 'all 0.4s',
									borderRadius: '12px',
									fontWeight: 500,
									background: 'rgba(255, 255, 255, 0.1)',
									fontSize: '20px',
									cursor: 'pointer',
									fontFamily: 'Montserrat, sans-serif !important',
									fontStyle: 'italic !important',
									width: '280px',
									color: '#fff',
									'&:hover': {
										background: 'rgba(255, 0, 0, 0.6)',
										borderColor: 'rgba(255, 255, 255, 0.5)',
									},
									a: {
										textDecoration: 'none',
										'&:hover': {
											textDecoration: 'none',
											color: '#fff',
										},
									},

									img: {
										width: '20px',
										height: 'auto',
										ml: '10px',
									},
								},
							}}
						>
							<Link href="http://virtual.metaspacecy.com/#/xmas" target="_blank">
								<button>
									Join Virtual Xmas <img src={icon} alt="icon" />
								</button>
							</Link>
						</Box>
					</Stack>
				</Box>
			</Box>
			<Box
				sx={{
					img: {
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						objectPosition: 'center',
						display: 'block',
					},
				}}
			>
				<img src={bg1} alt="xmas" />
			</Box>
			<Box
				sx={{
					position: 'relative',

					'& > img': {
						width: '100%',
						height: '100vh',
						minHeight: '620px',
						objectFit: 'cover',
						objectPosition: 'bottom',
						display: 'block',
						'@media (max-width: 480px)': {
							height: '620px',
						},
					},
				}}
			>
				<img src={bg2} alt="xmas" />
				<Box
					sx={{
						position: 'absolute',
						top: '40px',
						left: '50%',
						transform: 'translateX(-50%)',
						width: '100%',
						zIndex: '5',
						px: 4,

						'@media (max-width: 768px)': {
							px: 2,
						},
						'@media (max-width: 480px)': {
							px: '10px',
						},

						h2: {
							fontFamily: 'Montserrat, sans-serif !important',
							fontWeight: '500',
							textAlign: 'center',
							'@media (max-width: 1440px)': {
								fontSize: '52px',
							},
							'@media (max-width: 1024px)': {
								fontSize: '44px',
							},
							'@media (max-width: 768px)': {
								fontSize: '36px',
							},
							'@media (max-width: 480px)': {
								fontSize: '28px',
							},
						},
					}}
				>
					<Box sx={{ maxWidth: '1070px', mx: 'auto', color: '#fff' }}>
						<Typography variant="h2" color="#fff">
							Into The Metaverse
						</Typography>
						<Stack
							gap="10px"
							mt="16px"
							sx={{
								h5: {
									'@media (max-width: 1024px)': {
										fontSize: '20px',
									},
									'@media (max-width: 768px)': {
										fontSize: '18px',
									},
									'@media (max-width: 480px)': {
										fontSize: '16px',
									},
								},
							}}
						>
							<Stack
								direction="row"
								gap="10px"
								sx={{
									img: {
										width: '24px',
										height: '24px',
									},
									h5: {
										fontFamily: 'Montserrat, sans-serif !important',
										fontWeight: '400',
									},
								}}
							>
								<img src={star} alt="star" />
								<Typography variant="h5">
									Climb on the 99-floor Christmas tree to enjoy the Xmas village’s
									panoramic view
								</Typography>
							</Stack>
							<Stack
								direction="row"
								gap="10px"
								sx={{
									img: {
										width: '24px',
										height: '24px',
									},
									h5: {
										fontFamily: 'Montserrat, sans-serif !important',
										fontWeight: '400',
									},
								}}
							>
								<img src={star} alt="star" />
								<Typography variant="h5">
									Sightsee “Gassho Go Winter” village by train tour
								</Typography>
							</Stack>
							<Stack
								direction="row"
								gap="10px"
								sx={{
									img: {
										width: '24px',
										height: '24px',
									},
									h5: {
										fontFamily: 'Montserrat, sans-serif !important',
										fontWeight: '400',
									},
								}}
							>
								<img src={star} alt="star" />
								<Typography variant="h5">
									Immersive experience with games: Skiing, Snowboarding and
									Hoverboarding
								</Typography>
							</Stack>
							<Stack
								direction="row"
								gap="10px"
								sx={{
									img: {
										width: '24px',
										height: '24px',
									},
									h5: {
										fontFamily: 'Montserrat, sans-serif !important',
										fontWeight: '400',
									},
								}}
							>
								<img src={star} alt="star" />
								<Typography variant="h5">
									Build your own Snowman Snowball fight with your best friends
								</Typography>
							</Stack>
							<Stack
								direction="row"
								gap="10px"
								sx={{
									img: {
										width: '24px',
										height: '24px',
									},
									h5: {
										fontFamily: 'Montserrat, sans-serif !important',
										fontWeight: '400',
									},
								}}
							>
								<img src={star} alt="star" />
								<Typography variant="h5">
									Grab your Xmas gifts from the Greatet Christmas tree
								</Typography>
							</Stack>
						</Stack>
					</Box>
				</Box>
				<Box
					sx={{
						position: 'absolute',
						left: '50%',
						bottom: '40px',
						transform: 'translateX(-50%)',
						width: '70%',
						img: {
							width: '100%',
							height: 'auto',
						},
						'@media (max-height: 800px)': {
							width: '55%',
						},
						'@media (max-width: 1440px)': {
							width: '80%',
						},
						'@media (max-width: 1024px)': {
							width: '90%',
						},
					}}
				>
					<img src={xmasTextttt} alt="xmas" />
				</Box>
			</Box>
			<Box
				sx={{
					background: `url(${bg9}) center center / cover no-repeat`,
					px: 4,
					pt: 4,
					pb: 6,
					'@media (max-width: 768px)': {
						px: 2,
					},
					'@media (max-width: 480px)': {
						px: '10px',
					},
				}}
			>
				<Box
					sx={{
						h3: {
							// textTransform: 'uppercase',
							fontFamily: 'Montserrat, sans-serif !important',
							fontWeight: '500',
							textAlign: 'center',
							mb: 4,
							'@media (max-width: 1440px)': {
								fontSize: '42px',
							},
							'@media (max-width: 1024px)': {
								fontSize: '36px',
							},
							'@media (max-width: 768px)': {
								fontSize: '30px',
							},
							'@media (max-width: 480px)': {
								fontSize: '24px',
							},
						},
						h5: {
							fontFamily: 'Montserrat, sans-serif !important',
							fontWeight: '400',
							// textAlign: 'center',
							'@media (max-width: 1024px)': {
								fontSize: '22px',
							},
							'@media (max-width: 768px)': {
								fontSize: '20px',
							},
							'@media (max-width: 480px)': {
								fontSize: '18px',
							},
						},
					}}
				>
					<Box sx={{ maxWidth: '1090px', mx: 'auto', color: '#fff' }}>
						<Stack
							direction="row"
							alignItems="center"
							gap="32px"
							mb={6}
							sx={{
								'@media (max-width: 400px)': {
									gap: 0,
								},
							}}
						>
							<Box
								sx={{
									'@media (max-width: 650px)': {
										img: {
											width: '140px',
											'@media (max-width: 400px)': {
												display: 'none',
											},
										},
									},
								}}
							>
								<img src={snowman} alt="snowman" />
							</Box>
							<Box>
								<Typography variant="h3" color="#fff">
									Guideline
								</Typography>
								<Typography variant="h5">
									“Xmas X Space Into The Metaverse” is an open virtual space for
									everyone to come. Everyone is able to enjoy cool, snowy
									Christmas via immersive experience in the virtual world with a
									lot gaming activities and get lucky gifts on the greatest
									Christmas tree if owning NFT tickets.
								</Typography>
							</Box>
						</Stack>

						<Box
							sx={{
								textAlign: 'center',
								h3: { fontFamily: 'Montserrat, sans-serif !important' },
							}}
						>
							<Typography variant="h3" fontWeight={500}>
								How To Get Xmas NFT Tickets
							</Typography>
						</Box>
						<Stack direction="row" gap="32px" alignItems="center" my={4} sx={{}}>
							<Stack
								gap="10px"
								mt="48px"
								mb="32px"
								justifyContent="center"
								sx={{
									width: 'fit-content',
									mx: 'auto',
									'@media (max-width: 400px)': {
										my: 0,
									},
									h5: {
										'@media (max-width: 1024px)': {
											fontSize: '20px',
										},
										'@media (max-width: 768px)': {
											fontSize: '18px',
										},
										'@media (max-width: 480px)': {
											fontSize: '16px',
										},
									},
								}}
							>
								<Stack
									direction="row"
									gap="10px"
									sx={{
										img: {
											width: '20px',
											height: '20px',
											mt: '2px',
										},
										h5: {
											fontFamily: 'Montserrat, sans-serif !important',
											fontWeight: '400',
										},
									}}
								>
									<img src={check} alt="check" />
									<Typography variant="h5">
										Become OG in Metaspacecy Discord
									</Typography>
								</Stack>
								<Stack
									direction="row"
									gap="10px"
									sx={{
										img: {
											width: '20px',
											height: '20px',
											mt: '2px',
										},
										h5: {
											fontFamily: 'Montserrat, sans-serif !important',
											fontWeight: '400',
										},
									}}
								>
									<img src={check} alt="check" />
									<Typography variant="h5" id="join">
										Win giveaway from Metaspacecy Partner’s event
									</Typography>
								</Stack>
							</Stack>
							<Box
								sx={{
									img: {
										width: '180px',
										'@media (max-width: 400px)': {
											display: 'none',
										},
									},
								}}
							>
								<img src={slide} alt="slide" />
							</Box>
						</Stack>

						<Box
							sx={{
								textAlign: 'center',
								h3: { fontFamily: 'Montserrat, sans-serif !important' },
							}}
						>
							<Typography variant="h3" fontWeight={500}>
								How To Join
							</Typography>
						</Box>
						<Stack
							direction="row"
							justifyContent="space-between"
							py={2}
							gap={3}
							id="xmas"
							sx={{
								h5: {
									'@media (max-width: 1024px)': {
										fontSize: '20px',
									},
									'@media (max-width: 768px)': {
										fontSize: '18px',
									},
									'@media (max-width: 480px)': {
										fontSize: '16px',
									},
								},
								'@media (max-width: 480px)': {
									flexDirection: 'column',
								},
							}}
						>
							<Box sx={{ textAlign: 'center' }}>
								<img src={item1} alt="item" />
								<Typography variant="h5" mt={1}>
									Connect your Metamask
								</Typography>
							</Box>
							<Box sx={{ textAlign: 'center' }}>
								<img src={item2} alt="item" />
								<Typography variant="h5" mt={1}>
									Choose your avatar
								</Typography>
							</Box>
							<Box sx={{ textAlign: 'center' }}>
								<img src={item3} alt="item" />
								<Typography variant="h5" mt={1}>
									Experience Xmas space
								</Typography>
							</Box>
						</Stack>
						<Box
							sx={{
								textAlign: 'center',
								mt: 4,
								button: {
									padding: '10px 30px',
									border: '1.5px solid #e7e8ec',
									transition: 'all 0.4s',
									borderRadius: '12px',
									fontWeight: 500,
									background: 'rgba(255, 255, 255, 0.1)',
									fontSize: '20px',
									cursor: 'pointer',
									fontFamily: 'Montserrat, sans-serif !important',
									fontStyle: 'italic !important',
									width: '280px',
									color: '#fff',
									'&:hover': {
										background: 'rgba(255, 0, 0, 0.6)',
										borderColor: 'rgba(255, 255, 255, 0.5)',
									},
									a: {
										textDecoration: 'none',
										'&:hover': {
											textDecoration: 'none',
											color: '#fff',
										},
									},

									img: {
										width: '20px',
										height: 'auto',
										ml: '10px',
									},
								},
							}}
						>
							<Link href="http://virtual.metaspacecy.com/#/xmas" target="_blank">
								<button>
									Join Virtual Xmas <img src={icon} alt="icon" />
								</button>
							</Link>
						</Box>
					</Box>
				</Box>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					maxWidth={1800}
					mx="auto"
					mt={2}
				>
					<Box
						sx={{
							img: {
								'@media (max-width: 1300px)': { width: '350px' },
								'@media (max-width: 1200px)': { width: '300px' },
								'@media (max-width: 1100px)': { width: '280px' },
								'@media (max-width: 1024px)': {
									display: 'none',
								},
							},
						}}
					>
						<img src={item4} alt="itme" />
					</Box>
					<Box
						sx={{
							img: {
								width: '400px',
								'@media (max-width: 450px)': {
									width: '300px',
								},
							},
						}}
					>
						<img src={gif} alt="gif" />
					</Box>
					<Box
						sx={{
							img: {
								'@media (max-width: 1300px)': { width: '350px' },
								'@media (max-width: 1200px)': { width: '300px' },
								'@media (max-width: 1100px)': { width: '280px' },
								'@media (max-width: 1024px)': {
									display: 'none',
								},
							},
						}}
					>
						<img src={item5} alt="itme" />
					</Box>
				</Stack>
			</Box>
			{/* <Box
				sx={{
					img: {
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						objectPosition: 'bottom',
						display: 'center',
						minHeight: '200px',
					},
				}}
			>
				<img src={bg3} alt="xmas" />
			</Box> */}
			<Box
				sx={{
					position: 'relative',
					img: {
						width: '100%',
						height: '100vh',
						objectFit: 'cover',
						objectPosition: 'bottom',
						display: 'block',
					},
				}}
			>
				<img src={bg4} alt="xmas" />
				<Box
					sx={{
						position: 'absolute',
						left: '50%',
						top: '50%',
						transform: 'translate(-50%, -50%)',
						width: '100%',
					}}
				>
					<Slider />
				</Box>
			</Box>
			<Box
				sx={{
					img: {
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						objectPosition: 'bottom',
						display: 'block',
					},
				}}
			>
				<img src={bg5} alt="xmas" />
			</Box>
			<Box
				sx={{
					img: {
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						objectPosition: 'bottom',
						display: 'block',
					},
				}}
			>
				<img src={bg6} alt="xmas" />
			</Box>
			<Box
				sx={{
					img: {
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						objectPosition: 'bottom',
						display: 'block',
					},
				}}
			>
				<img src={bg7} alt="xmas" />
			</Box>
			<Box
				sx={{
					img: {
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						objectPosition: 'bottom',
						display: 'block',
					},
				}}
			>
				<img src={bg8} alt="xmas" />
			</Box>
		</Box>
	);
}
