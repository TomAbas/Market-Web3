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

export const changePriceToToken = (wei: string) => {
	return Number(wei) / 10 ** 8;
};

export const changeTokenToWei = (token: string) => {
	return (Number(token) * 10 ** 8).toString();
};
export const formatTimeHistory = (time: Date | string): string => {
	let result: string;

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
