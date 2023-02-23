/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useSearchParams } from 'react-router-dom';
import DropDown from 'components/CustomUI/DropDown';
import { ButtonContent, DropdownContent } from 'components/Marketplace/ViewAll/TopCollection';
import TopCollection from './CollectionRanking';
import InfiniteListTopTrader from './TopTrader';
import { getTopCollections } from 'api/collectionApi';
import { getTopTradeUsers } from 'api/userApi';
const Ranking = () => {
	const initFilter = { name: '7 days', value: 'volume7Days' };
	const [searchParams, setSearchParams] = useSearchParams();
	const [activeDropDown, setActiveDropDown] = useState<boolean>(false);
	const [value, setValue] = useState('1');
	const [topCollection, setTopCollection] = useState([]);
	const [loadingTopCollection, setLoadingTopCollection] = useState<boolean>(true);
	const [topTrader, setTopTrader] = useState([]);
	const [loadingTopTrader, setLoadingTopTrader] = useState<boolean>(true);
	const [selectedFilter, setSelectedFilter] = useState<any>(initFilter);
	const handleClickOption = (filterDay: any) => {
		setSelectedFilter(filterDay);
		setActiveDropDown(false);
	};
	let query = searchParams.get('query');
	useEffect(() => {
		if (query) {
			setValue(query);
		}
	}, [query]);
	useEffect(() => {
		getTopCollections('2', '100', '1', selectedFilter.value).then((res: any) => {
			setTopCollection(res.data);
			setLoadingTopCollection(false);
		});
		let time = selectedFilter.name.split(' ')[0];
		getTopTradeUsers('2', time).then((res: any) => {
			setTopTrader(res);
			setLoadingTopTrader(false);
		});
	}, [selectedFilter]);

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
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

				<Box
					sx={{
						'& .ranking': {
							padding: '6px 8px 6px 12px',
							border: '1px solid #E7E8EC',
							background: '#fff',
							borderRadius: '12px',
							cursor: 'pointer',
							width: '180px',
							margin: '20px 60px',
						},
						h3: {
							fontSize: '16px',
							color: '#1d1d1f',
							fontWeight: 500,
							justifyContent: 'space-between',
							paddingLeft: 0,
						},
					}}
				>
					<DropDown
						activeDropDown={activeDropDown}
						setActiveDropDown={setActiveDropDown}
						buttonContent={
							<ButtonContent
								variant="body1"
								selectedFilter={selectedFilter}
								sx={{
									animation: 'none',
									background: 'white',
									backgroundClip: 'text',
									backgroundSize: '100% auto',
									WebkitTextFillColor: 'unset',
									color: 'black',
									fontSize: '1rem',
								}}
							/>
						}
						dropdownContent={
							<DropdownContent
								selectedFilter={selectedFilter}
								handleClickOption={handleClickOption}
							/>
						}
						className="ranking"
					/>
				</Box>

				<TabPanel value="2">
					<InfiniteListTopTrader
						listTopTrader={topTrader}
						setListTopTrader={setTopTrader}
						isLoading={loadingTopTrader}
						filter={selectedFilter}
					/>
				</TabPanel>
				<TabPanel value="1">
					<TopCollection
						listCollection={topCollection}
						filter={selectedFilter}
						isLoading={loadingTopCollection}
					/>
				</TabPanel>
			</TabContext>
		</Box>
	);
};
export default Ranking;
