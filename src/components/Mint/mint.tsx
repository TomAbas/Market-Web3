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
		<Box sx={{ width: '550px', paddingTop: '150px', paddingLeft: '10%' }}>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<TabList onChange={handleChange} aria-label="lab API tabs example">
						<Tab label="Item" value="1" />
						<Tab label="Collection" value="2" />
					</TabList>
				</Box>
				<TabPanel value="1">
					<LayoutMintNFT />
				</TabPanel>
				<TabPanel value="2">
					<LayoutCreateCollection />
				</TabPanel>
			</TabContext>
		</Box>
	);
}
