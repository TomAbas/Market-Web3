export interface Collection {
	userAddress: string;
	chainId?: string;
	collectionName?: string;
	uri?: string;
	category: number;
	description: string;
}

export interface Item {
	itemName: string;
	description: string;
	creator: string;
	chainId: string;
	itemMedia: string;
	royalties: number;
	collectionId: string;
}
