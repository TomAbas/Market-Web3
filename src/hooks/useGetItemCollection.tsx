import { getItemOfCollection } from 'api/collectionApi';
// import { Collection } from 'models/collection';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'redux/hooks';
import { selectTrigger } from 'redux/slices/nftFilter';

const useGetItemCollection = (collectionId: string | undefined) => {
	const [collectionInfo, setCollectionInfo] = useState<any>();
	const [loadingCollectionImg, setLoadingCollectionImg] = useState(true);
	const triggerFetchNft = useAppSelector(selectTrigger);
	async function fetchCollectionItems() {
		if (collectionId) {
			let collection = await getItemOfCollection(collectionId).then((res: any) => res.data);
			setCollectionInfo(collection);
			setLoadingCollectionImg(false);
		}
	}
	useEffect(() => {
		fetchCollectionItems();
	}, [triggerFetchNft, collectionId]);

	return { collectionInfo, loadingCollectionImg };
};

export default useGetItemCollection;
