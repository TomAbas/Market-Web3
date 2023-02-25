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
import NoMaxWidthTooltip from 'customComponents/LongToolTip/LongToolTip';
import { displayUserFullName } from 'utils/formatDisplay';
import CardCollection from 'components/Marketplace/CardCollection/CardCollection';
import SkeletonCardNft from 'components/Skeletons/SkeletonCardNft';
import NoItem from 'customComponents/NoItem/NoItem';
import NoData from '../../../../assets/icons/Nodata.svg';
export default function Items() {
	let [searchParams] = useSearchParams();
	const category = searchParams.get('category');
	const [collections, setCollections] = useState([]);
	const [loading, setLoading] = useState(true);
	let navigate = useNavigate();
	const handleCollectionDetail = (collectionId: string) => {
		//encodeURIComponent
		navigate(`/collection-detail/${collectionId}`);
	};
	async function getAllCollections() {
		let { data } = await getAllCollectionsAPI('2');
		setCollections(data);
		setLoading(false);
	}
	async function getCategoryCollections() {
		setLoading(true);
		let { data } = await getCategoryCollectionsAPI('2', category!);
		setCollections(data);
		setLoading(false);
	}
	useEffect(() => {
		if (category === null) {
			getAllCollections();
		} else {
			getCategoryCollections();
		}
	}, [category]);
	return (
		<TabPanel value="2" sx={{ px: 0 }}>
			<>
				<FilterCollection />
				<Grid container spacing={1} px={1}>
					{loading ? (
						<>
							{new Array(12).fill(null).map((item, idx) => (
								<SkeletonCardNft key={idx} />
							))}
						</>
					) : (
						<>
							{collections.length > 0 ? (
								<>
									{collections.map((collection: any, index: any) => (
										<CardCollection collection={collection} key={index} />
									))}
								</>
							) : (
								<>
									<NoItem title="No item" image={NoData} />
								</>
							)}
						</>
					)}
				</Grid>
			</>
		</TabPanel>
	);
}
