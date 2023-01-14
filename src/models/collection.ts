export interface Collection {
	userAddress: string;
	chainId?: string;
	collectionName?: string;
	logo?: string;
	category: number;
	description: string;
	txHash?: string;
	to?: string;
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
}

export interface ListInfo {
	chainId: string;
	maker: string;
	taker: string;
	quantity: string;
	freeRecipient: string;
	itemId: string;
	basePrice: string;
}
