/* eslint-disable @typescript-eslint/no-unused-vars */
import TabPanel from '@mui/lab/TabPanel';
import { Box, Grid, Link, Stack, Typography } from '@mui/material';
import FilterCollection from 'components/Marketplace/FilterCollection';
import { ItemImage } from 'components/Marketplace/styled';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import item from '../../../../assets/images/card/box.webp';
import {
	getAllCollections as getAllCollectionsAPI,
	getCategoryCollections as getCategoryCollectionsAPI,
} from 'api/collectionApi';
import { async } from '@firebase/util';
export default function Items() {
	let [searchParams, setSearchParams] = useSearchParams();
	const category = searchParams.get('category');
	const [collections, setCollections] = useState([]);
	let navigate = useNavigate();
	const handleCollectionDetail = (collectionId: string) => {
		//encodeURIComponent
		navigate(`/collection-detail/${collectionId}`);
	};
	async function getAllCollections() {
		let { data } = await getAllCollectionsAPI('2');

		setCollections(data);
	}
	async function getCategoryCollections() {
		let { data } = await getCategoryCollectionsAPI('2', category!);

		setCollections(data);
	}
	useEffect(() => {
		if (category === null) {
			getAllCollections();
		} else {
			getCategoryCollections();
			console.log('chay');
		}
	}, [category]);
	return (
		<TabPanel value="2" sx={{ px: 0 }}>
			<>
				<FilterCollection />
				<Grid container spacing={1}>
					{collections.map((collection: any, index: any) => (
						<Grid
							item
							xs={6}
							sm={4}
							md={3}
							p={1}
							key={index}
							onClick={() => {
								handleCollectionDetail(collection._id);
							}}
						>
							<Link
								// href={`https://explorer.aptoslabs.com/account/${
								// 	collection[0].split('*/////*')[1]
								// }`}
								target="_blank"
								sx={{
									textDecoration: 'none',
									color: '#131740',
									'&:hover': {
										boxShadow: '0px 3px 6px rgb(13 16 45 / 25%)',
									},
								}}
							>
								<Box
									sx={{
										border: '1.5px solid #e7e8ec',
										borderRadius: '12px',
										overflow: 'hidden',
										cursor: 'pointer',
										transition: 'all 0.4s',
										padding: '12px 12px 0',
										background: '#fff',
										'&:hover': {
											boxShadow: '0px 3px 6px rgb(13 16 45 / 25%)',
										},
									}}
								>
									<ItemImage>
										<Box className="main-img">
											<img src={collection.logo} alt="collection" />
										</Box>
									</ItemImage>

									<Box py={1.5}>
										<Typography variant="h6">
											{collection.collectionName}
										</Typography>
										<Stack
											mt={1}
											direction="row"
											alignItems="center"
											justifyContent="space-between"
											gap={1}
										>
											<Stack direction="row" gap={1} alignItems="center">
												<Box
													sx={{
														img: {
															width: '32px',
															height: '32px',
															objectFit: 'cover',
															objectPosition: 'center',
															borderRadius: '50%',
														},
													}}
												>
													<img src={collection.logo} alt="collection" />
												</Box>
												<Typography variant="body1">
													{collection.userAddress.slice(0, 6) +
														'...' +
														collection.userAddress.slice(
															collection.userAddress.length - 4
														)}
												</Typography>
											</Stack>
											<Box>
												<Typography variant="body1">
													{collection.listItem.length} items
												</Typography>
											</Box>
										</Stack>
									</Box>
								</Box>
							</Link>
						</Grid>
					))}
				</Grid>
			</>
		</TabPanel>
	);
}
