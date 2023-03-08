/* eslint-disable @typescript-eslint/no-unused-vars */
import InfiniteListActivity from 'components/Marketplace/DetailCard/TabItemDetail/ActivityTab/InfiniteListActivity';
import { TabWrapperContainer } from 'components/Marketplace/DetailCard/TabItemDetail/ActivityTab/styled';
import { itemHistory } from 'models/item';
import React, { useEffect, useState } from 'react';
import { getAuctionHis } from '../../../../api/items/itemsApi';
import { getEventsByEvent } from '../../../../utils/auctionResources';
interface Props {
	infoUser: any;
}
const AuctionHistory: React.FC<Props> = ({ infoUser }) => {
	const [listUserHistory, setListUserHistory] = useState<itemHistory[]>([]);
	const [loading, setLoading] = useState(true);
	// async function getUserHistoryFc() {
	// 	setListUserHistory(await getUserHistory(infoUser.userAddress).then((res: any) => res.data));
	// 	setLoading(false);
	// }
	async function getHisBid() {
		let listBid = await getEventsByEvent(
			infoUser?.userAddress!,
			'0x1::aptos_coin::AptosCoin',
			'2'
		)
			.then((res) =>
				res.map((item: any) => {
					return item.data;
				})
			)
			.catch((error) => {
				return [];
			});
		let listBidHistory = await Promise.all(
			listBid.map(async (item: any) => {
				let body = { creationNumber: item.bid_id.listing_id.creation_number };
				let list = await getAuctionHis(infoUser.userAddress, body);
				item.auctionInfo = list;
				item.fromUserInfo = infoUser;
				return item;
			})
		);
		setListUserHistory(listBidHistory);
		setLoading(false);
	}
	useEffect(() => {
		if (infoUser) {
			getHisBid();
		}
	}, [infoUser]);
	return (
		<TabWrapperContainer>
			<InfiniteListActivity
				listItemHistory={listUserHistory}
				loading={loading}
				isAuction={true}
			/>
		</TabWrapperContainer>
	);
};

export default AuctionHistory;
