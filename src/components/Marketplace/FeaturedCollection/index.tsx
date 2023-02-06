import { Box, Grid, Link, Stack, Typography } from '@mui/material';
import {
	DropdownWrapper,
	FilterContent,
	MainHeader,
	ListOption,
	OptionItem,
	OptionItemText,
	CheckIconWrapper,
	ItemImage,
	SubTitle,
} from './styled';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import SkeletonCardNft from 'components/SkeletonCardNft';
import DropDown from 'components/CustomUI/DropDown';
import { getCategoryCollections, getAllCollections } from 'api/collectionApi';
import { displayAddress } from 'utils/formatDisplay';

interface Props0 {
	selectedFilter: any;
	handleClickOption: any;
}

interface Props1 {
	selectedFilter: string;
}
const listFilter: any = [
	{ id: 0, name: 'All', value: null },
	{ id: 1, name: 'Art', value: 1 },
	{ id: 2, name: 'Music', value: 2 },
	{ id: 3, name: 'Photography', value: 3 },
	{ id: 4, name: 'Games', value: 4 },
	{ id: 5, name: 'Sport', value: 5 },
	{ id: 6, name: 'Metaverse', value: 6 },
	{ id: 7, name: 'Box', value: 7 },
	{ id: 8, name: 'Trading Card', value: 8 },
];
const ButtonContent: React.FC<Props1> = ({ selectedFilter }) => {
	return (
		<SubTitle
			variant="h2"
			sx={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginLeft: '8px',
			}}
		>
			{selectedFilter} <KeyboardArrowDownIcon sx={{ width: 40, height: 40 }} />
		</SubTitle>
	);
};

const DropdownContent: React.FC<Props0> = ({ selectedFilter, handleClickOption }) => {
	return (
		<DropdownWrapper sx={{ width: '180px' }}>
			<ListOption>
				{listFilter.map((filter: any, index: number) => {
					const isItemSelected = selectedFilter === filter.name;
					return (
						<OptionItem key={index} onClick={() => handleClickOption(filter)}>
							<OptionItemText>{filter.name}</OptionItemText>

							{isItemSelected && (
								<CheckIconWrapper>
									<CheckIcon sx={{ width: '100%', height: '100%' }} />
								</CheckIconWrapper>
							)}
						</OptionItem>
					);
				})}
			</ListOption>
		</DropdownWrapper>
	);
};

const FeaturedCollection = () => {
	let arr = new Array(4);
	const [activeDropDown, setActiveDropDown] = useState<boolean>(false);
	const [selectedFilter, setSelectedFilter] = useState<string>('All');
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [collections, setCollections] = useState<any[]>([]);
	const handleClickOption = (filter: any) => {
		setSelectedFilter(filter.name);
		setActiveDropDown(false);
	};
	let navigate = useNavigate();
	function handleCollectionDetail(collectionId: string) {
		navigate(`/collection-detail/${collectionId}`);
	}
	function handleCreatorDetail(userAddress: string) {
		navigate(`/profile?address=${userAddress}`);
	}
	useEffect(() => {
		let category = listFilter.find((item: any) => item.name === selectedFilter).value;
		if (category === null) {
			getAllCollections('2').then((res: any) => {
				console.log('dsd', res.data);
				setCollections(res.data.slice(0, 4));
				setIsLoading(false);
			});
		} else {
			getCategoryCollections('2', category.toString()).then((res: any) => {
				setCollections(res.data.slice(0, 4));
				setIsLoading(false);
			});
		}
	}, [selectedFilter]);

	return (
		<>
			{' '}
			<Box sx={{ textAlign: 'center', mb: 2 }}>
				<FilterContent>
					<MainHeader variant="h2" fontWeight="600" fontStyle="italic">
						Featured Collections
					</MainHeader>
					<DropDown
						activeDropDown={activeDropDown}
						setActiveDropDown={setActiveDropDown}
						buttonContent={<ButtonContent selectedFilter={selectedFilter} />}
						dropdownContent={
							<DropdownContent
								selectedFilter={selectedFilter}
								handleClickOption={handleClickOption}
							/>
						}
					/>
				</FilterContent>
				{/* <Typography variant="h2" fontWeight={500}>
					Featured Collections
				</Typography>
				<DropDown
					activeDropDown={activeDropDown}
					setActiveDropDown={setActiveDropDown}
					buttonContent={<ButtonContent selectedFilter={selectedFilter} />}
					dropdownContent={
						<DropdownContent
							selectedFilter={selectedFilter}
							handleClickOption={handleClickOption}
						/>
					}
				/> */}
			</Box>
			<Grid container spacing={1}>
				{isLoading ? (
					<>
						{arr.map((item, idx) => (
							<SkeletonCardNft key={idx} />
						))}
					</>
				) : (
					<>
						{collections.map((collection: any, index: any) => (
							<Grid xs={6} sm={4} md={3} p={1} key={index}>
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
										<ItemImage
											onClick={() => {
												handleCollectionDetail(collection._id);
											}}
										>
											<Box className="main-img">
												<img src={collection.logo} alt="collection" />
											</Box>
										</ItemImage>

										<Box py={1.5}>
											<Typography
												variant="h6"
												onClick={() => {
													handleCollectionDetail(collection._id);
												}}
											>
												{collection.collectionName}
											</Typography>
											<Stack
												mt={1}
												direction="row"
												alignItems="center"
												justifyContent="space-between"
												gap={1}
											>
												<Stack
													direction="row"
													gap={1}
													alignItems="center"
													onClick={() =>
														handleCreatorDetail(collection.userAddress)
													}
												>
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
														<img
															src={collection?.ownerInfo.avatar}
															alt="collection"
														/>
													</Box>
													<Typography variant="body1">
														{displayAddress(collection.userAddress)}
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
					</>
				)}
			</Grid>
		</>
	);
};

export default FeaturedCollection;
