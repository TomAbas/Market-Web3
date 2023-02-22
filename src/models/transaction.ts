import { nftItem } from './item';

export interface SellingProps {
	isErc1155: boolean;
	saleKind: number;
	currentPaymentToken: any;
	price: any;
	startPrice: number;
	endPrice: number;
	quantity: number;
	maxSupply: number;
	// feeMethod: number;
	startTime: any;
	endTime: any;
}

export interface orderSell {
	_id: string;
	chainId: string;
	maker: string;
	itemId: string;
	minPrice: string;
	coinType: string;
	creationNumber: string;
	amount: string;
	startTime: string;
	expirationTime: string;
	instantSale: string;
	auctionId: string;
	itemInfo: nftItem;
	createdAt: string;
}
