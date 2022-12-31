import React from 'react';
import FooterComp from 'components/FooterComp';
import Header from 'components/Header';
import { Outlet } from 'react-router-dom';

const index = () => {
	return (
		<>
			<Header />
			<Outlet />
			<FooterComp />
		</>
	);
};

export default index;
