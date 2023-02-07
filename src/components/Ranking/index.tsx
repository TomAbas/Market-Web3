/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useSearchParams } from 'react-router-dom';
import InfiniteListTrendingCollection from './CollectionRanking';
import InfiniteListTopTrader from './TopTrader';
const Ranking = () => {
	let [searchParams, setSearchParams] = useSearchParams();
	const [value, setValue] = React.useState('1');
	let query = searchParams.get('query');
	React.useEffect(() => {
		if (query) {
			setValue(query);
		}
	}, [query]);
	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	const handleCreateItem = (status: boolean) => {
		if (status === true) {
			setValue('2');
		}
	};

	return (
		<Box sx={{ mx: 'auto', paddingTop: '150px' }}>
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
						<Tab label="Top Collections" value="1" />
						<Tab label="Top Traders" value="2" />
					</TabList>
				</Box>
				<TabPanel value="2">
					<InfiniteListTrendingCollection />
				</TabPanel>
				<TabPanel value="1">
					<InfiniteListTopTrader />
				</TabPanel>
			</TabContext>
		</Box>
	);
};
export default Ranking;
