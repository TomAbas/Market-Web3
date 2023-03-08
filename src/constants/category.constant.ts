export interface Category {
	id: number;
	name: string;
	value: number;
}

export const listCategory: Category[] = [
	// { id: 0, name: 'Other', value: 0 },
	{ id: 1, name: 'Art', value: 1 },
	{ id: 2, name: 'Music', value: 2 },
	{ id: 3, name: 'Photography', value: 3 },
	{ id: 4, name: 'Games', value: 4 },
	{ id: 5, name: 'Sport', value: 5 },
	{ id: 6, name: 'Metaverse', value: 6 },
	{ id: 7, name: 'Trading Cards', value: 7 },
	{ id: 8, name: 'Domain Names', value: 8 },
];

export const listCategoryPrediction: Category[] = [
	// { id: 0, name: 'Other', value: 0 },
	{ id: 1, name: 'Crypto', value: 1 },
	{ id: 2, name: 'Economics', value: 2 },
	{ id: 3, name: 'Esports', value: 3 },
	{ id: 4, name: 'Sports', value: 4 },
	{ id: 5, name: 'Polictics', value: 5 },
];
export interface OptionSelectCustom<T> {
	name: string;
	value: T;
	image?: string;
	chainId?: number;
}
