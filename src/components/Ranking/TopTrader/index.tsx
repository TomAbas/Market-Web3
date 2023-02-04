/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Container, Typography } from '@mui/material';
import InfiniteListTopTrader from './InfiniteListTopTrader';
import { useEffect, useState } from 'react';
import { getTopTradeUsers } from 'api/userApi';
import DropDown from 'components/CustomUI/DropDown';
import { ButtonContent, DropdownContent } from 'components/Marketplace/TopCollection';
const TopTrader = () => {
	let initFilter = {
		name: '7 days',
		value: 'volume7Days',
	};
	const [activeDropDown, setActiveDropDown] = useState<boolean>(false);
	const [selectedFilter, setSelectedFilter] = useState<any>(initFilter);
	const handleClickOption = (filterDay: any) => {
		setSelectedFilter(filterDay);
		// setSortBy(filter.value);

		setActiveDropDown(false);
	};
	const [listTopTrader, setListTopTrader] = useState<any>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const hasNextPage = false;
	const handleFetchNextPage = () => {};
	const allowLoadMore = false;
	useEffect(() => {
		const fetchData = async () => {
			let time = selectedFilter.name.split(' ')[0];
			getTopTradeUsers('2', time).then((res: any) => {
				setListTopTrader(res);
				setIsLoading(false);
			});
		};
		fetchData();
	}, [selectedFilter]);
	return (
		<Box sx={{}}>
			<Container
				maxWidth="xl"
				sx={{
					pt: 18,
				}}
			>
				<Box
					sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 8 }}
				>
					<Typography variant="h2" fontWeight="500">
						Top Traders
					</Typography>
				</Box>

				<Box
					sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
				>
					{/* <FilterItemRanking
						initialStateFilter={initialState.filter}
						filter={filter}
						setFilter={setFilter}
					/> */}
					<Box
						sx={{
							'& .ranking': {
								padding: '6px 8px 6px 12px',
								border: '1px solid #E7E8EC',
								background: '#fff',
								borderRadius: '12px',
								cursor: 'pointer',
								width: '180px',
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
				</Box>

				<Box sx={{ margin: '20px 0' }}>
					<InfiniteListTopTrader
						listTopTrader={listTopTrader}
						isLoading={isLoading}
						hasNextPage={hasNextPage}
						fetchNextPage={handleFetchNextPage}
						allowLoadMore={allowLoadMore}
					/>
				</Box>

				{/* {!allowLoadMore && hasNextPage && !isLoading && (
					<Stack sx={{ marginTop: '50px' }} alignItems="center">
						<ButtonLoadmore onClick={() => setAllowLoadMore(true)} />
					</Stack>
				)} */}
			</Container>
		</Box>
	);
};

export default TopTrader;
