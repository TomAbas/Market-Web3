export interface Response<T> {
	data: T;
}

export interface InputCreateCollection {
	name: string;
	description: string;
	file: any;
	category: number;
}

export interface InputCreateNFT extends InputCreateCollection {
	collection: string;
	collectionId: string;
	amount: number;
	royaltyFee: number;
	name: string;
	description: string;
	file: any;
}

export interface CustomFile extends File {
	path?: string;
	preview?: string;
	raw?: File;
}

export interface OptionSelectCustom<T> {
	name: string;
	value: T;
	image?: string;
	chainId?: number;
}

export interface filterNft {
	status: number[];
	collectionId: string[];
	tokenSymbol?: string;
	minPrice: string;
	maxPrice: string;
	itemName: string;
	owner?: string;
	text?: string;
	isFiltering: boolean;
	statusRoyal: number[];
}

export interface PriceActivity {
	date: string;
	avgPrice: number;
}
