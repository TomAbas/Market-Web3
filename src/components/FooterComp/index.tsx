/* eslint-disable @typescript-eslint/no-unused-vars */

import {
	BigContainer,
	BrandWrap,
	DetailColumn,
	DetailContainer,
	DetailLink,
	DetailList,
	DetailTitle,
	FooterText,
	FooterWrap,
	GridContent,
	ListRow,
	LogoLink,
	SocialIconLink,
	SocialWrap,
	LinkWrapper,
} from './styled';
import LogoMSBlue from '../../assets/images/logo/MSMobile-blue.webp';
import LogoMSWhite from '../../assets/images/logo/logoMetaBlue.png';
import LogoMSMobileBlue from '../../assets/images/logo/Metaspacecy-blue.svg';
import LogoMSMobileWhite from '../../assets/images/logo/MSMobile-white.webp';
import LogoMSGray from '../../assets/images/logo/logo-metaspacecy-gray.png';
import LogoMSGrayMoblie from '../../assets/images/logo/logo-metaspacecy-gray-moblie.png';
import { Box, useTheme, Container, Typography, Stack } from '@mui/material';
// import { useLocation } from "react-router-dom";

// import { useNavigateSearch } from "hooks";
// // constants
// import { RELATED_URLS } from "../../../constants";
// import { useNavigate } from "react-router-dom";

// IMG
import TwitterWhite from '../../assets/icons/twitter-white.svg';
import TwitterGray from '../../assets/icons/twitter-gray.svg';
import DiscordrWhite from '../../assets/icons/discord-white.svg';
import DiscordrGray from '../../assets/icons/discord-gray.svg';
// import Instagram from '../../assets/icons/instagram-white.svg';
// import InstagramGray from '../../assets/icons/instagram-gray.svg';
import TelegramWhite from '../../assets/icons/telegram-white.svg';
import TelegramGray from '../../assets/icons/telegram-gray.svg';
import TiktokWhite from '../../assets/icons/tiktok-white.svg';
import TiktokGray from '../../assets/icons/tiktok-gray.svg';
import FacebookWhite from '../../assets/icons/facebook-white.svg';
import FacebookGray from '../../assets/icons/facebook-gray.svg';
import YoutubeGray from '../../assets/icons/youtubeicon.svg';
import MidiumGray from '../../assets/icons/mediumicon.svg';
import Instagram from '../../assets/icons/icon-instagram.svg';
import {
	PATH_BLOG,
	PATH_CATEGORY,
	PATH_COLLECTION,
	PATH_DROP,
	PATH_PAGE,
	PATH_SOCIAL,
	PATH_VIEWALL,
	PATH_VIRTUAL_WORLD,
} from '../../routes/path';
// import Link from "theme/overrides/Link";

//

const ListSocialMedia = [
	{
		id: 1,
		title: 'Facebook',
		iconWhite: FacebookWhite,
		iconBlack: FacebookGray,
		link: `${PATH_SOCIAL.facebook}`,
	},
	{
		id: 2,
		title: 'Telegram',
		iconWhite: TelegramWhite,
		iconBlack: TelegramGray,
		link: `${PATH_SOCIAL.tele}`,
	},
	{
		id: 3,
		title: 'Twitter',
		iconWhite: TwitterWhite,
		iconBlack: TwitterGray,
		link: `${PATH_SOCIAL.twitter}`,
	},
	{
		id: 4,
		title: 'Midium',
		iconWhite: MidiumGray,
		iconBlack: MidiumGray,
		link: `${PATH_SOCIAL.medium}`,
	},
	{
		id: 5,
		title: 'Discord',
		iconWhite: DiscordrWhite,
		iconBlack: DiscordrGray,
		link: `${PATH_SOCIAL.discord}`,
	},
	{
		id: 6,
		title: 'Youtube',
		iconWhite: YoutubeGray,
		iconBlack: YoutubeGray,
		link: `${PATH_SOCIAL.youtube}`,
	},
	{
		id: 7,
		title: 'Instagram',
		iconWhite: Instagram,
		iconBlack: Instagram,
		link: `${PATH_SOCIAL.instagram}`,
	},
];

const ContentFooter = [
	{ id: 1, content: 'Discover, create, connect' },
	{ id: 1, content: 'Trade unique and exclusive NFT Collections' },
	{ id: 1, content: 'Build, create, and develop your space in the Metaverse' },
	{ id: 1, content: 'NFTs are the keys to accessing the Metaverse' },
];

const FooterComp: React.FC = () => {
	const theme = useTheme();
	const isLightTheme = theme.palette.mode === 'dark';
	// const navigateSearchParams = useNavigateSearch();
	// const navigate = useNavigate();

	// //Path
	// const { pathname } = useLocation();
	// const isHomePage = pathname === "/";

	const marketplace = [
		{
			title: 'Marketplace',
			contents: [
				{
					title: 'Collectible',
					link: `${PATH_VIEWALL.collections}`,
					isFilter: false,
				},
				{
					title: 'Art',
					link: `${PATH_CATEGORY.artwork}`,
					isFilter: true,
				},
				{
					title: 'Music',
					link: `${PATH_CATEGORY.artwork}`,
					isFilter: true,
				},
				{
					title: 'Sport',
					link: `${PATH_CATEGORY.artwork}`,
					isFilter: true,
				},
				{
					title: 'Domain Name',
					link: `${PATH_CATEGORY.artwork}`,
					isFilter: true,
				},
				{
					title: 'Trading Card',
					link: `${PATH_CATEGORY.artwork}`,
					isFilter: true,
				},
				{
					title: 'Esport',
					link: `${PATH_CATEGORY.artwork}`,
					isFilter: true,
				},
			],
		},
	];
	const detailList = [
		{
			title: 'Drops',
			contents: [
				{
					id: 1,
					name: 'Mystery Box',
					link: '',
					target: '',
				},
				{
					id: 2,
					name: 'Event',
					link: '',
					target: '',
				},

				{
					id: 3,
					name: 'Boarc',
					link: `${PATH_DROP.boarc}`,
					target: '',
				},
				{
					id: 4,
					name: 'Auction',
					link: ``,
					target: '',
				},
			],
		},

		{
			title: 'My Account',
			contents: [
				{
					id: 1,
					name: 'Profile',
					link: '',
					target: '',
				},

				{
					id: 2,
					name: 'Watchlist',
					link: '',
					target: '',
				},

				{
					id: 3,
					name: 'Favorites',
					link: '',
					target: '',
				},

				{
					id: 4,
					name: 'My Collection',
					link: '',
					target: '',
				},

				// {
				// 	id: 5,
				// 	name: 'Create Item',
				// 	link: `#${PATH_ITEM.createItem}`,
				// },
			],
		},
		{
			title: 'Company',
			contents: [
				// {
				// 	name: 'About',
				// 	link: ``,
				// 	id: 1,
				// target: '',
				// },
				// {
				// 	name: 'Legal',
				// 	link: ``,
				// 	id: 2,
				// target: '',
				// },
				{
					name: 'Docs',
					link: 'https://docs.metaspacecy.com/doc/',
					id: 3,
					target: '_blank',
				},
				{
					name: 'Blog',
					link: 'https://metaspacecy.com/#/blog',
					id: 4,
					target: '_self',
				},
				{
					name: 'FAQ',
					link: 'https://docs.metaspacecy.com/doc/faqs',
					id: 5,
					target: '_blank',
				},
			],
		},
	];
	return (
		<FooterWrap
			sx={{
				pt: '6rem',
				[theme.breakpoints.down(1507)]: {
					pt: '4rem',
				},
			}}
		>
			{/* <Container maxWidth="xxl" > */}
			<BigContainer>
				<GridContent>
					<BrandWrap>
						{/* Logo */}
						<LogoLink href="/">
							{isLightTheme ? (
								<img className="logoMobile" src={LogoMSBlue} alt="page logo" />
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
									src={LogoMSMobileBlue}
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
						{theme.palette.mode === 'light' ? (
							<Box
								mb={4}
								sx={{
									[theme.breakpoints.down(1100)]: {
										textAlign: 'center',
									},
								}}
							>
								{ContentFooter.map((title: any, index: number) => (
									<Typography
										fontSize="18px"
										padding="4px 0"
										fontStyle="italic"
										key={index}
										sx={{
											fontFamily: 'Montserrat, san-serif',
											[theme.breakpoints.down(500)]: {
												fontSize: '13px',
											},
										}}
									>
										{title.content}
									</Typography>
								))}
							</Box>
						) : (
							<Box
								mb={4}
								sx={{
									[theme.breakpoints.down(1100)]: {
										textAlign: 'center',
									},
								}}
							>
								{ContentFooter.map((title: any, index: number) => (
									<Typography
										key={index}
										fontSize="18px"
										padding="2px 0"
										fontStyle="italic"
										sx={{
											color: 'white !important',
											[theme.breakpoints.down(500)]: {
												fontSize: '13px',
											},
										}}
									>
										{title.content}
									</Typography>
								))}
							</Box>
						)}

						<SocialWrap>
							{ListSocialMedia.map((item: any, index: number) => (
								<SocialIconLink href={`${item.link}`} target="_blank" key={index}>
									<img
										style={{ width: '100%', height: '100%' }}
										// src={isLightTheme ? item.iconBlack : item.iconWhite}
										src={item.iconBlack}
										alt={item.title}
									/>
								</SocialIconLink>
							))}
						</SocialWrap>

						<Stack direction="row" gap={3} mt={4}>
							<LinkWrapper
								href="https://metaspacecy.com/#/terms-of-service"
								target="_blank"
							>
								<Typography
									variant="body2"
									fontWeight="400"
									sx={{
										opacity: 0.6,
										fontFamily: 'Montserrat, san-serif',

										[theme.breakpoints.down(500)]: {
											fontSize: '13px',
										},
									}}
									fontSize="16px"
									fontStyle="italic"
								>
									Terms of Service
								</Typography>
							</LinkWrapper>
							<LinkWrapper
								href="https://metaspacecy.com/#/privacy-policy"
								target="_blank"
							>
								<Typography
									variant="body2"
									fontWeight="400"
									sx={{
										opacity: 0.6,
										fontFamily: 'Montserrat, san-serif',

										[theme.breakpoints.down(500)]: {
											fontSize: '13px',
										},
									}}
									fontSize="16px"
									fontStyle="italic"
								>
									Privacy Policy
								</Typography>
							</LinkWrapper>
						</Stack>
					</BrandWrap>
					<DetailContainer>
						{marketplace.map((item, index) => (
							<DetailColumn key={index}>
								<DetailTitle
									sx={{
										fontSize: '22px',
										fontStyle: 'italic',
										[theme.breakpoints.down(500)]: {
											fontSize: '18px',
										},
									}}
								>
									{item.title}
								</DetailTitle>
								<DetailList>
									{item.contents.map((item, index) => (
										<ListRow
											key={index}
											sx={{
												fontSize: 18,
												opacity: item.link === '' ? '0.6' : '1',
												padding: '4px 0',
												fontStyle: 'italic',
												[theme.breakpoints.down(500)]: {
													fontSize: '13px',
												},
											}}
										>
											<DetailLink
												href={
													item.isFilter
														? item.link + '?category=' + item.title
														: item.link
												}
												target="_blank"
												sx={{
													fontStyle: 'italic',
													pointerEvents:
														item.link === '' ? 'none' : 'pointer',
												}}
											>
												{item.title}
											</DetailLink>
										</ListRow>
									))}
								</DetailList>
							</DetailColumn>
						))}
						{detailList.map((item, index) => (
							<DetailColumn key={index}>
								<DetailTitle
									sx={{
										fontSize: '22px',
										fontStyle: 'italic',
										[theme.breakpoints.down(500)]: {
											fontSize: '18px',
										},
									}}
								>
									{item.title}
								</DetailTitle>
								<DetailList>
									{item.contents.map((item, index) => (
										<ListRow
											key={index}
											sx={{
												opacity: item.link === '' ? '0.6' : '1',
												fontSize: '18px',
												padding: '4px 0',
												[theme.breakpoints.down(500)]: {
													fontSize: '13px',
												},
											}}
										>
											<DetailLink
												sx={{
													cursor:
														item.link === '' ? 'default' : 'pointer',
													pointerEvents:
														item.link === '' ? 'none' : 'pointer',
													fontStyle: 'italic',
												}}
												target="_blank"
												href={item.link}
											>
												{item.name}
											</DetailLink>
										</ListRow>
									))}
								</DetailList>
							</DetailColumn>
						))}
					</DetailContainer>
				</GridContent>
			</BigContainer>
			{/* </Container> */}
		</FooterWrap>
	);
};
export default FooterComp;
