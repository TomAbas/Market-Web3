import React from 'react';
import ActivityTab from './ActivityTab/ActivityTab';
import DetailTab from './DetailTab/DetailTab';
import GraphTab from './GraphTab';
import iconAssetBlack from '../../../../assets/icons/asset-black.webp';
import iconAssetBlue from '../../../../assets/icons/asset-blue.webp';
import iconDescriptionBlack from '../../../../assets/icons/description-black.webp';
import iconDescriptionBlue from '../../../../assets/icons/description-blue.webp';
import iconGraphBlack from '../../../../assets/icons/graph-black.webp';
import iconGraphBlue from '../../../../assets/icons/graph-blue.webp';
import TabCommon from 'customComponents/customTabs/TabCommon/TabCommon';
import { nftItem } from 'models/item';

interface Props {
	userAmountOfItem: string;
	item: nftItem;
}
const TabItemDetail: React.FC<Props> = ({ userAmountOfItem, item }) => {
	const tabsDetail = {
		items: [
			{
				title: 'Detail',
				icon: <img src={iconAssetBlack} alt="asset icon" width={20} height={20} />,
				iconSelected: <img src={iconAssetBlue} alt="asset icon" width={20} height={20} />,
				isShow: true,
			},
			{
				title: 'Activity',
				icon: (
					<img src={iconDescriptionBlack} alt="description icon" width={20} height={16} />
				),
				iconSelected: (
					<img src={iconDescriptionBlue} alt="description icon" width={20} height={16} />
				),
				isShow: true,
			},
			{
				title: 'Graph',
				icon: <img src={iconGraphBlack} alt="graph icon" width={32} height={15} />,
				iconSelected: <img src={iconGraphBlue} alt="graph icon" width={32} height={15} />,
				isShow: false,
			},
		],
		sections: [
			{
				Section: <DetailTab userAmountOfItem={userAmountOfItem} item={item} />,
				isShow: true,
			},
			{
				Section: <ActivityTab />,
				isShow: true,
			},
			{
				Section: <GraphTab />,
				isShow: false,
			},
		],
	};
	return (
		<>
			<TabCommon
				tabItems={tabsDetail.items}
				tabSections={tabsDetail.sections}
				tabAlignment="left"
			/>
		</>
	);
};

export default TabItemDetail;
