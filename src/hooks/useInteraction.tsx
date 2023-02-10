/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectUser } from 'redux/slices/userInfo';
import { getLikesStatusOfItem as getLikesStatusOfItemAPI, putLikesToItem } from 'api/userApi';
import { toast } from 'react-toastify';
import { handleTrigger } from 'redux/slices/nftFilter';
import { nftItem } from 'models/item';

const useInteraction = () => {
	const dispatch = useAppDispatch();
	const userInfo = useAppSelector(selectUser);
	const [itemLiked, setItemLiked] = useState<string[]>([]);

	useEffect(() => {
		console.log(itemLiked);
	}, []);
	async function getLikesStatusOfItem() {
		if (userInfo?.userAddress) {
			try {
				let arrLikesItem = await getLikesStatusOfItemAPI(userInfo?.userAddress).then(
					(res) => res.data.data
				);
				arrLikesItem = arrLikesItem.map((item: nftItem) => item._id);
				setItemLiked(arrLikesItem);
			} catch (error) {
				toast.error("Can't get like status");
			}
		}
	}
	async function likeItem(itemId: string, state: boolean) {
		if (userInfo?.userAddress) {
			try {
				await putLikesToItem(userInfo.userAddress, itemId, state);
				getLikesStatusOfItem();
				dispatch(handleTrigger());
				if (state === true) {
					toast.success('Successful like an item!');
				} else {
					toast.success('Successful unlike an item!');
				}
			} catch (error) {
				toast.error("Cant't like item");
			}
		}
	}
	function checkIsLike(itemId: string): boolean {
		let result = itemLiked.includes(itemId);
		return result;
	}
	useEffect(() => {
		getLikesStatusOfItem();
	}, [userInfo]);

	return { itemLiked, likeItem, checkIsLike };
};
export default useInteraction;
