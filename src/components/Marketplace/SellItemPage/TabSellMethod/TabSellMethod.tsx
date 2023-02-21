import FormSellFixPrice from 'components/Forms/FormSellFixPrice/FormSellFixPrice';
import TabCommon from 'customComponents/customTabs/TabCommon/TabCommon';
import iconAssetBlack from '../../../../assets/icons/asset-black.webp';
import iconAssetBlue from '../../../../assets/icons/asset-blue.webp';
import iconHistoryBlack from '../../../../assets/icons/history-black.webp';
import iconHistoryBlue from '../../../../assets/icons/history-blue.webp';
import FormCreateAuction from 'components/Forms/FormCreateAuction/FormCreateAuction';

const TabSellMethod = () => {
	const tabsDetail = {
		items: [
			{
				title: 'Fixed Price',
				icon: <img src={iconAssetBlack} alt="asset icon" width={20} height={20} />,
				iconSelected: <img src={iconAssetBlue} alt="asset icon" width={20} height={20} />,
				isShow: true,
			},
			{
				title: 'Auction',
				icon: <img src={iconHistoryBlack} alt="history icon" width={20} height={20} />,
				iconSelected: (
					<img src={iconHistoryBlue} alt="history icon" width={20} height={20} />
				),
				isShow: true,
			},
		],
		sections: [
			{
				Section: <FormSellFixPrice />,
				isShow: true,
			},
			{ Section: <FormCreateAuction />, isShow: false },
		],
	};
	return <TabCommon tabItems={tabsDetail.items} tabSections={tabsDetail.sections} />;
};

export default TabSellMethod;
