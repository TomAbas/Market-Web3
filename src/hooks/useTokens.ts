import { AccountKeys } from '@manahippo/aptos-wallet-adapter';
import { getUserItem } from 'api/items/itemsApi';
import { nftItem } from 'models/item';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'redux/hooks';
import { selectUser } from 'redux/slices/userInfo';
// import { Token } from '../types';
import { walletClient } from '../utils/aptos';

export function useTokens(account: AccountKeys | null) {
	const [tokens, setTokens] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [userNfts, setUserNfts] = useState<nftItem[]>([]);
	const userInfo = useAppSelector(selectUser);
	async function fetchUserNft() {
		setUserNfts(await getUserItem('2', userInfo?.userAddress!).then((res) => res.data));
	}

	useEffect(() => {
		if (userInfo?.userAddress) {
			fetchUserNft();
		}
	}, [userInfo]);
	useEffect(() => {
		const getTokens = async () => {
			const data = await walletClient.getTokenIds(account!.address!.toString(), 100, 0, 0);
			const tokens = await Promise.all(
				data.tokenIds
					.filter((i) => i.difference !== 0)
					.map(async (i) => {
						const token = await walletClient.getToken(i.data);
						return {
							propertyVersion: i.data.property_version,
							creator: i.data.token_data_id.creator,
							collection: token.collection,
							name: token.name,
							description: token.description,
							uri: token.uri,
							maximum: token.maximum,
							supply: token.supply,
						};
					})
			);
			setLoading(false);
			setTokens(tokens);
		};
		if (account?.address) {
			getTokens();
		}
	}, [account]);
	return { tokens, loading, userNfts };
}
