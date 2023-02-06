import { nftItem } from 'models/item';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getBalanceToken } from 'service/aptos.service';

const useGetAcountTokenAmount = (userAddress: string, itemInfo: nftItem) => {
	const [userTokenAmount, setUserTokenAmount] = useState('');
	async function getUserBalanceToken() {
		if (!userAddress) {
			return;
		}
		try {
			setUserTokenAmount(
				await getBalanceToken(
					userAddress,
					itemInfo?.creator,
					itemInfo?.collectionInfo.collectionName!,
					itemInfo?.itemName,
					'2'
				).then((res) => {
					return res;
				})
			);
		} catch (error) {
			toast.error("can't not get your balances of tokens");
			console.log(error);
		}
	}

	useEffect(() => {
		getUserBalanceToken();
	}, []);

	return { userTokenAmount };
};

export default useGetAcountTokenAmount;
