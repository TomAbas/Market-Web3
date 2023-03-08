import React, { useEffect } from 'react';

const useGetData = (axios: any) => {
	const [data, setData] = React.useState([]);
	async function getData() {
		setData(await axios());
	}
	useEffect(() => {
		getData();
	}, []);
	useEffect(() => {
	}, [data]);
	return [data, setData];
};

export default useGetData;
