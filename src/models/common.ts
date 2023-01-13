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
