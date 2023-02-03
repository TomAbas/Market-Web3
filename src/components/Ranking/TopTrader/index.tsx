import { Box, Container, Typography } from '@mui/material';
import InfiniteListTopTrader from './InfiniteListTopTrader';
import { useEffect, useState } from 'react';
const TopTrader = () => {
	let listTopTrader: any = [];
	const [isLoading, setIsLoading] = useState(false);
	const hasNextPage = false;
	const handleFetchNextPage = () => {};
	const allowLoadMore = false;
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
		};
		fetchData();
	}, []);
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
						Top List Traders
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
						{/* <DropDown
							activeDropDown={activeDropDown}
							setActiveDropDown={setActiveDropDown}
							buttonContent={renderButtonContent()}
							dropdownContent={renderDropdownContent()}
							className="ranking"
						/> */}
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
