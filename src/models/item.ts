import { Collection } from './collection';
import { User } from './user';

export interface nftItem {
	_id: string;
	chainId: string;
	itemTokenId: string;
	itemName: string;
	description: string;
	itemMedia: string;
	itemOriginMedia: string;
	itemPreviewMedia: string;
	properties: object;
	owner: Array<string>;
	creator: string;
	status: number;
	offer_status: number;
	price: string;
	priceType: string;
	collectionId: string;
	itemStandard: string;
	isFreeze: boolean;
	external_url: string;
	ownerInfo: User[];
	creatorInfo: User;
	isBox: boolean;
	collectionInfo: Collection;
	countFav: number;
	royalties: number;
}

export const TYPE_TRANSACTION: { [key: number]: string } = {
	1: 'Mint',
	2: 'Accept Offer',
	3: 'Sale',
	4: 'Transfer',
	5: 'Cancel',
	6: 'List',
	7: 'Buy',
	8: 'Auction Created',
	9: 'Auction Settle',
	10: 'Expired',
	11: 'Unbox',
	12: 'Create Staking',
	13: 'Harvest Staking',
	14: 'Cancel Staking',
};

export const ITEM_STATUS = {
	NOT_FOR_SELL: 0,
	BUY_NOW: 1,
};
export interface itemHistory {
	_id: string;
	collectionId: string;
	collectionInfo: Collection;
	itemId: string;
	from: string;
	to: string;
	price: string;
	priceType: string;
	quantity: number;
	txHash: string;
	type: number;
	createdAt: Date;
	itemInfo: nftItem;
	fromUserInfo: User;
}
