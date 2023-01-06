export interface Response<T> {
	data: T;
}

export interface InputCreateCollection {
	name: string;
	description: string;
	file: any;
}

export interface InputCreateNFT extends InputCreateCollection {
	collection: string;
	amount: number;
	royaltyFee: number;
}

export interface CustomFile extends File {
	path?: string;
	preview?: string;
	raw?: File;
}
