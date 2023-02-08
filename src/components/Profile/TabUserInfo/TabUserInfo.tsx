/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import iconAssetBlack from '../../../assets/icons/asset-black.webp';
import iconAssetBlue from '../../../assets/icons/asset-blue.webp';
import iconHistoryBlack from '../../../assets/icons/history-black.webp';
import iconHistoryBlue from '../../../assets/icons/history-blue.webp';
import iconBiddingBlack from '../../../assets/icons/bidding-black.webp';
import iconBiddingBlue from '../../../assets/icons/bidding-blue.webp';
import iconFavoriteBlack from '../../../assets/icons/favorite-black.webp';
import iconFavoriteBlue from '../../../assets/icons/favorite-blue.webp';
import AssetTab from './AssetTab/AssetTab';
import FavoriteTab from './Favorite/FavoriteTab';
import TabCommon from 'customComponents/customTabs/TabCommon/TabCommon';
import { nftItem } from 'models/item';

interface Props {
	items: nftItem[];
	itemsF: nftItem[];
	isLoading: boolean;
}
const TabUserInfo: React.FC<Props> = ({ items, itemsF, isLoading }) => {
	const tabsDetail = {
		items: [
			{
				title: 'Assets',
				icon: <img src={iconAssetBlack} alt="asset icon" width={20} height={20} />,
				iconSelected: <img src={iconAssetBlue} alt="asset icon" width={20} height={20} />,
				isShow: true,
			},
			// {
			// 	title: 'History',
			// 	icon: <img src={iconHistoryBlack} alt="history icon" width={20} height={20} />,
			// 	iconSelected: (
			// 		<img src={iconHistoryBlue} alt="history icon" width={20} height={20} />
			// 	),
			// 	isShow: true,
			// },
			// {
			// 	title: 'Offer',
			// 	icon: <img src={iconBiddingBlack} alt="bidding icon" width={24} height={24} />,
			// 	iconSelected: (
			// 		<img src={iconBiddingBlue} alt="bidding icon" width={24} height={24} />
			// 	),
			// 	isShow: true,
			// },
			{
				title: 'Favorites',
				icon: <img src={iconFavoriteBlack} alt="favorite icon" width={22} height={20} />,
				iconSelected: (
					<img src={iconFavoriteBlue} alt="favorite icon" width={22} height={20} />
				),
				isShow: true,
			},
		],
		sections: [
			{
				Section: <AssetTab items={items} isLoading={isLoading} />,
				isShow: true,
			},
			// { Section: <ActivityTab />, isShow: true },
			// {
			// 	Section: (
			// 		<OffersTab
			// 			currentFilterOfferOption={currentFilterOfferOption}
			// 			setCurrentFilterFilterOfferOption={setCurrentFilterFilterOfferOption}
			// 			listFilterOfferOption={listFilterOfferOption}
			// 		/>
			// 	),
			// 	isShow: isMyAccount,
			// },
			{ Section: <FavoriteTab itemsF={itemsF} isLoading={isLoading} />, isShow: true },
		],
	};
	return <TabCommon tabItems={tabsDetail.items} tabSections={tabsDetail.sections} />;
};

export default TabUserInfo;
