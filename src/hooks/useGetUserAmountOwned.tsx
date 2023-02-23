import { nftItem } from 'models/item';
import { useState, useEffect } from 'react';
import { getBalanceToken } from 'service/aptos.service';

const useGetUserAmountOwned = (nftItem: nftItem, userAddress: string) => {
	const [amountOwned, setAmountOwned] = useState<string>('0');
	async function getAmountOwn() {
		try {
			setAmountOwned(
				await getBalanceToken(
					userAddress!,
					nftItem.creator,
					nftItem.collectionInfo.collectionName,
					nftItem.itemName,
					nftItem.chainId
				)
			);
		} catch (error) {
			setAmountOwned('0');
			console.log(error);
		}
	}
	// useEffect(() => {
	// 	if (userInfo?.userAddress && nftItem) {
	// 		getAmountOwn();
	// 	}
	// }, [ nftItem]);

	return { amountOwned };
};

export default useGetUserAmountOwned;
