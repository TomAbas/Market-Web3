import { ListTokenPaymentTestNet } from 'constants/sellItem';
import { CustomFile } from '../models/common';
import numeral from 'numeral';
import moment from 'moment';
export const getFileType = (file: CustomFile | string | null) => {
	if (!file) return;
	let f: any;
	if (typeof file === 'string') {
		f = file.split('.');
	} else {
		f = file.path?.split('.');
	}
	return f[f.length - 1].split('?')[0];
};

export function fData(number: string | number) {
	return numeral(number).format('0.0 b');
}
export const compressImage = (url: string, width: number, quality: string) => {
	if (url === '') return url;
	const split = url.split('/');
	const index = split.indexOf('upload');
	split.splice(index + 1, 0, `w_${width}`, `q_auto:${quality},f_auto`);
	return split.join('/');
};

export const sliceString = (string: string, limit = 0) => {
	if (string && 0 < string.length && typeof limit === 'number') {
		return string.length < limit ? string : `${string.slice(0, limit)}...`;
	}
	return '';
};

export const changePriceToToken = (
	wei: string,
	tokenType: string = '0x1::aptos_coin::AptosCoin'
) => {
	let decimal = ListTokenPaymentTestNet.find((item) => item.type === tokenType)?.decimals || 8;
	return Number(wei) / 10 ** decimal;
};

export const changeTokenToWeiByCoinType = (
	price: string,
	tokenType: string = '0x1::aptos_coin::AptosCoin'
) => {
	let decimal = ListTokenPaymentTestNet.find((item) => item.type === tokenType)?.decimals || 8;
	return Math.floor(Number(price) * 10 ** decimal);
};
export const changeTokenToWei = (token: string, decimal: number = 8) => {
	return (Number(token) * 10 ** decimal).toString();
};
export const formatTimeHistory = (time: Date | string): string => {
	let result: string;
	time = new Date(time);
	if (!time) {
		result = '-----';
	} else {
		result = moment(time).format('MM/DD/YYYY h:mm A');
	}
	return result;
};

export function displayAddress(address: string) {
	return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
export const formatAddressHistory = (
	addressHistory: string,
	userAddress: string | null | undefined
): string => {
	let result: string = '';

	if (!addressHistory) {
		result = '-----';
	} else if (addressHistory === userAddress) {
		result = 'You';
	} else {
		result = displayAddress(addressHistory) ?? '-----';
	}

	return result;
};

export const compareDate = (date1: Date, date2: Date): number => {
	const date1TimeStamp: number = new Date(date1).getTime();
	const date2TimeStamp: number = new Date(date2).getTime();

	if (date1TimeStamp > date2TimeStamp) {
		return 1;
	} else if (date1TimeStamp < date2TimeStamp) {
		return -1;
	} else {
		return 0;
	}
};

export const formatTimestamp = (timestamp: number, format: string = 'MMMM Do, YYYY, h:mm A') => {
	return moment(new Date(timestamp * 1000)).format(format);
};

export const formatDate = (date: string | Date, format: string = 'MMMM Do, YYYY, h:mm A') => {
	return moment(new Date(date)).format(format);
};
