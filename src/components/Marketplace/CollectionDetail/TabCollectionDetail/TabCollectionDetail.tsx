import TabCommon from 'customComponents/customTabs/TabCommon/TabCommon';
import { Collection } from 'models/collection';
import React from 'react';
import iconAssetBlack from '../../../../assets/icons/asset-black.webp';
import iconAssetBlue from '../../../../assets/icons/asset-blue.webp';
import iconDescriptionBlack from '../../../../assets/icons/description-black.webp';
import iconDescriptionBlue from '../../../../assets/icons/description-blue.webp';
import ActivityTab from './ActivityTab/ActivityTab';
import ItemsTab from './ItemsTab/ItemsTab';

interface Props {
	collectionInfo: Collection;
}
const TabCollectionDetail: React.FC<Props> = ({ collectionInfo }) => {
	const tabsDetail = {
		items: [
			{
				title: 'Items',
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
		],
		sections: [
			{
				Section: <ItemsTab collectionInfo={collectionInfo} />,
				isShow: true,
			},
			{
				Section: <ActivityTab />,
				isShow: true,
			},
		],
	};
	return (
		<>
			<TabCommon
				tabItems={tabsDetail.items}
				tabSections={tabsDetail.sections}
				tabAlignment="center"
			/>
		</>
	);
};

export default TabCollectionDetail;
