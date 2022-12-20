/* eslint-disable @typescript-eslint/no-unused-vars */
import ChristmasTree from 'components/ChristmasTree';
import FooterComp from 'components/FooterComp';
import Header from 'components/Header';
import React, { useEffect, useState } from 'react';

function App() {
	return (
		<>
			<Header />
			<ChristmasTree />
			<FooterComp />
		</>
	);
}

export default App;
