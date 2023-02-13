import { nftItem } from './item';
import { User } from './user';

export interface Collection {
	_id: string;
	collectionAddress: string;
	userAddress: string;
	logo: string;
	background: string;
	collectionName: string;
	collectionStandard: string;
	royalties: number;
	description: string;
	volumeTrade: number;
	chainId: string;
	category: number;
	isConfirm: boolean;
	creatorInfo: User;
	ownerInfo: User;
	listItem: nftItem[];
	isINO: Number;
}

export interface CollectionTop extends Collection {
	percent7Days: number;
	percent30Days: number;
	percent24Hour: number;
	volumeTrade: number;
	volume24Hour: number;
	volume7Days: number;
	volume30Days: number;
}
export interface Item {
	itemName: string;
	description: string;
	creator: string;
	chainId: string;
	itemMedia: string;
	royalties: number;
	collectionId: string;
	txHash?: string;
	to?: string;
	amount?: number;
}

export interface Order {
	chainId: string;
	maker: string;
	taker: string;
	quantity: string;
	freeRecipient: string;
	itemId: string;
	basePrice: string;
}
