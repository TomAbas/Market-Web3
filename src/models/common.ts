export interface Response<T> {
	data: T;
}

export interface InputCreateCollection {
	name: string;
	description: string;
	file: File | null;
}

export interface InputCreateNFT extends InputCreateCollection {
	collection: string;
	amount: number;
	royaltyFee: number;
}
