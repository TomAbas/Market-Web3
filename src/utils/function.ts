import { CustomFile } from '../models/common';
import numeral from 'numeral';

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
