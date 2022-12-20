import axios from 'axios';
import { useState, useEffect } from 'react';

export const useGet = (url: string) => {
	const [res, setRes] = useState({});

	useEffect(() => {
		axios.get(url).then((res) => {
			setRes(res);
		});
	}, []);
	return { res };
};

export const usePost = async (url: string, data: object) => {
	try {
		await axios.post(url, data);
		return;
	} catch (error) {
		console.error(error);
		return;
	}
};
