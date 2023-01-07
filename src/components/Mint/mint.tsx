/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import LayoutMintNFT from './mintNFT';
import LayoutCreateCollection from './createCollection';

export default function MintTabs() {
	const [value, setValue] = React.useState('1');

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ maxWidth: '940px', mx: 'auto', paddingTop: '150px' }}>
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
					<TabList centered onChange={handleChange} aria-label="lab API tabs example">
						<Tab label="Collection" value="1" />
						<Tab label="Item" value="2" />
					</TabList>
				</Box>
				<TabPanel value="2">
					<LayoutMintNFT />
				</TabPanel>
				<TabPanel value="1">
					<LayoutCreateCollection />
				</TabPanel>
			</TabContext>
		</Box>
	);
}
