import { Box, Container, Typography } from '@mui/material';
import { CollectionTop } from 'models/collection';
import { useEffect, useState } from 'react';
import InfiniteListTrendingCollection from './InfiniteListTrendingCollection';
import { getTopCollections } from 'api/collectionApi';
const CollectionRanking = () => {
	const [listCollectionTop, setListCollectionTop] = useState<CollectionTop[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const hasNextPage = false;
	const handleFetchNextPage = () => {};
	const allowLoadMore = false;

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const listCollectionTop = await getTopCollections('2', '12', '1', 'volume7Days');
			console.log(listCollectionTop);
			setListCollectionTop(listCollectionTop.data);
			setIsLoading(false);
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
						Top Collections
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
					<InfiniteListTrendingCollection
						listCollection={listCollectionTop}
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
export default CollectionRanking;
