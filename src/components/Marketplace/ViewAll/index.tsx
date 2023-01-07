/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Items from './Items';
import Collections from './Collections';
import { Typography } from '@mui/material';
// import LayoutMintNFT from './mintNFT';
// import LayoutCreateCollection from './createCollection';

export default function ViewAll() {
	const [value, setValue] = React.useState('2');

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

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
						<Tab label="Items" value="2" />
						<Tab label="Collections" value="1" />
					</TabList>
				</Box>
				<TabPanel value="2">
					<Items />
				</TabPanel>
				<TabPanel value="1">
					<Collections />
				</TabPanel>
			</TabContext>
		</Box>
	);
}
