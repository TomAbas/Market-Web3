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
}
