/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

import Items from './Items';
import Collections from './Collections';
import { Typography } from '@mui/material';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';
import { handleReset } from 'redux/slices/nftFilter';
// import LayoutMintNFT from './mintNFT';
// import LayoutCreateCollection from './createCollection';

export default function ViewAll() {
	const navigate = useNavigate();
	const [value, setValue] = React.useState('1');
	const dispatch = useAppDispatch();
	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};
	useEffect(() => {
		if (window.location.href.includes('collections')) {
			setValue('2');
		}
		return () => {
			dispatch(handleReset());
		};
	}, [window.location.href]);
	return (
		<Box sx={{ maxWidth: '1350px', mx: 'auto', paddingTop: '150px' }}>
			<Typography variant="h1" fontWeight={500} textAlign="center" mb={3}>
				Marketplace
			</Typography>
			<TabContext value={value}>
				<Box
					sx={{
						borderBottom: 1,
						borderColor: 'divider',
						button: {
							fontSize: '20px',
							textTransform: 'none',
							color: '#131740',
							fontFamily: 'Montserrat, sans-serif',
							fontWeight: '600',
							fontStyle: 'italic',
						},
					}}
				>
					<TabList onChange={handleChange} aria-label="lab API tabs example">
						<Tab
							label="Items"
							value="1"
							onClick={() => {
								navigate('items/');
							}}
						/>
						<Tab
							label="Collections"
							value="2"
							onClick={() => {
								navigate('collections/');
							}}
						/>
					</TabList>
				</Box>
				<Outlet />
				{/* <TabPanel value="2" sx={{ px: 0 }}>
					<Items offers={offers} setOffers={setOffers} loadingOffers={loadingOffers} />
				</TabPanel>
				<TabPanel value="1" sx={{ px: 0 }}>
					<Collections collections={collections} indexTab="1" />
				</TabPanel> */}
			</TabContext>
		</Box>
	);
}
