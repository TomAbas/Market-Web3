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

	return f[f.length - 1];
};

export function fData(number: string | number) {
	return numeral(number).format('0.0 b');
}
