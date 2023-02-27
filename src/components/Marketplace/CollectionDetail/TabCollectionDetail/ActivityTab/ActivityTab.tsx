/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from 'react';
import GraphTab from 'components/Marketplace/DetailCard/TabItemDetail/GraphTab/GraphTab';
import { Box, Stack } from '@mui/material';
import ActivityTabComp from 'components/Marketplace/DetailCard/TabItemDetail/ActivityTab/ActivityTab';
import { Collection } from 'models/collection';
import { getCollectionHistory } from 'api/collectionApi';
import iconMint from '../../../../../assets/icons/iconMint.svg';
import iconMintWhite from '../../../../../assets/icons/iconMint-white.svg';
import iconCancel from '../../../../../assets/icons/iconCancel.svg';
import iconCancelWhite from '../../../../../assets/icons/iconCancel-white.svg';
import iconListing from '../../../../../assets/icons/iconListing.svg';
import iconListingWhite from '../../../../../assets/icons/iconListing-white.svg';
import iconOrder from '../../../../../assets/icons/iconOrder.svg';
import iconOrderWhite from '../../../../../assets/icons/iconOrder-white.svg';
import IconSearch from '../../../../../assets/icons/icon-search-black.svg';
import HistoryFilter from './ListActivity/HistoryFilter';
const dataChart = [
	{
		date: '2022-08-02T17:00:00.000Z',
		avgPrice: 1680.1659828,
	},
	{
		date: '2022-08-12T17:00:00.000Z',
		avgPrice: 16801.659828,
	},
];
interface Props {
	collectionInfo: Collection;
}

const ActivityTab: React.FC<Props> = ({ collectionInfo }) => {
	const [currentHistoryType, setCurrentHistoryType] = useState({
		Mint: { active: false, icon: iconMint, iconActive: iconMintWhite, type: 1 },
		Cancel: { active: false, icon: iconCancel, iconActive: iconCancelWhite, type: 5 },
		List: { active: false, icon: iconListing, iconActive: iconListingWhite, type: 6 },
		Order: { active: false, icon: iconOrder, iconActive: iconOrderWhite, type: 7 },
	});
	const [inputSearch, setInputSearch] = useState<string>('');
	const getHistoryFc = useCallback(async () => {
		return getCollectionHistory(collectionInfo._id).then((res: any) => res.data);
	}, []);
	return (
		<>
			<GraphTab listActivityPriceChart={dataChart} />
			<Stack direction={{ xs: 'column-reverse', lg: 'row' }} gap="50px" sx={{ px: 2 }}>
				<ActivityTabComp
					inputSearch={inputSearch}
					getHistory={getHistoryFc}
					currentHistoryType={currentHistoryType}
				/>
				<Box>
					<HistoryFilter
						setInputSearch={setInputSearch}
						setCurrentHistoryType={setCurrentHistoryType}
						currentHistoryType={currentHistoryType}
					/>
				</Box>
			</Stack>
		</>
	);
};

export default ActivityTab;
