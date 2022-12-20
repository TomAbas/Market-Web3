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
import xmas from '../../assets/images/background/xmas.webp';
import xmasText from '../../assets/images/background/xmas-text.webp';
import xmasTextttt from '../../assets/images/background/xmasss.webp';
import icon from '../../assets/icons/Icon.svg';
import star from '../../assets/icons/Star.svg';
import check from '../../assets/icons/check.svg';
import Slider from '../Slider';

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
									width: '240px',
									'&:hover': {
										background: 'rgba(255, 0, 0, 0.6)',
										borderColor: 'rgba(255, 255, 255, 0.5)',
									},
									a: {
										color: '#fff',
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
							<button>
								<Link href="http://virtual.metaspacecy.com/#/xmas" target="_blank">
									Join Virtual <img src={icon} alt="icon" />
								</Link>
							</button>
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
					img: {
						width: '100%',
						height: '100vh',
						objectFit: 'cover',
						objectPosition: 'bottom',
						display: 'block',
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
						px: 4,

						h2: {
							textTransform: 'uppercase',
							fontFamily: 'Montserrat, sans-serif !important',
							fontWeight: '600',
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
					<Box sx={{ maxWidth: '1070px', mx: 'auto', color: '#fff', px: 4 }}>
						<Typography variant="h2" color="#fff">
							InTO the Metaverse
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
									Enjoy climbing the 99-floor Christmas tree to overview Xmas
									villages Visit "Gassho Go Winter" Village Tour by train
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
									Immersive Experience with games: Skiing, Snowboarding and
									Hoverboarding Game
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
								<Typography variant="h5">Build your own Snowman</Typography>
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
									Snow throw game with your best friends
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
									Grab your Xmas gifts from the tallest Christmas tree
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
				}}
			>
				<Box
					sx={{
						h2: {
							textTransform: 'uppercase',
							fontFamily: 'Montserrat, sans-serif !important',
							fontWeight: '600',
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
						h5: {
							fontFamily: 'Montserrat, sans-serif !important',
							fontWeight: '400',
							textAlign: 'center',
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
					<Box sx={{ maxWidth: '1070px', mx: 'auto', color: '#fff' }}>
						<Typography variant="h2" color="#fff">
							How To Join
						</Typography>
						<Typography variant="h5">
							Xmas X Space Into The Metaverse opens for everyone to come. However,
							getting more immersive experience with gaming activities and receive
							lucky gifts by owning your NFT tickets following the tasks
						</Typography>
						<Stack
							gap="10px"
							mt="48px"
							mb="32px"
							justifyContent="center"
							sx={{
								width: 'fit-content',
								mx: 'auto',
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
								alignItems="center"
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
								<img src={check} alt="check" />
								<Typography variant="h5">Being @Spaceman in Discord</Typography>
							</Stack>
							<Stack
								direction="row"
								gap="10px"
								alignItems="center"
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
								<img src={check} alt="check" />
								<Typography variant="h5">Follow Metaspacecy Twitter</Typography>
							</Stack>
							<Stack
								direction="row"
								gap="10px"
								alignItems="center"
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
								<img src={check} alt="check" />
								<Typography variant="h5">Retweet post</Typography>
							</Stack>
							<Stack
								direction="row"
								gap="10px"
								alignItems="center"
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
								<img src={check} alt="check" />
								<Typography variant="h5">Being active daily</Typography>
							</Stack>
						</Stack>
						<Stack
							direction="row"
							gap="32px"
							justifyContent="center"
							sx={{
								a: {
									color: '#fff',
									textDecoration: 'none',
								},
							}}
						>
							<Link href={`${PATH_SOCIAL.discord}`} target="_blank">
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
									<img src={TwitterWhite} alt="twitter" />
									<Typography variant="h5">Metaspacecy</Typography>
								</Stack>
							</Link>

							<Link href={`${PATH_SOCIAL.discord}`} target="_blank">
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
									<img src={DiscordWhite} alt="twitter" />
									<Typography variant="h5">@Spaceman</Typography>
								</Stack>
							</Link>
						</Stack>
						<Box
							sx={{
								textAlign: 'center',
								mt: '32px',
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
									width: '300px',

									'&:hover': {
										background: 'rgba(255, 0, 0, 0.6)',
										borderColor: 'rgba(255, 255, 255, 0.5)',
									},
									a: {
										color: '#fff',
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
							<button>
								<Link href={`${PATH_SOCIAL.discord}`} target="_blank">
									Complete Your Tasks
								</Link>
							</button>
						</Box>
					</Box>
				</Box>
			</Box>
			<Box
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
			</Box>
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
