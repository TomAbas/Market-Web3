export interface User {
	userAddress: string;
	avatar: string;
	background: string;
	username: string;
	email: string;
	social: string;
	bio: string;
	nonce?: number;
	totalItems?: number;
	createdAt?: string;
	balance?: string;
}

export interface UserLoginModel {
	userAddress: string | undefined;
	signature?: string;
}
