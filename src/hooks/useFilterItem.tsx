/* eslint-disable @typescript-eslint/no-unused-vars */
import { getItemCollected, getItemCreate } from 'api/items/itemsApi';
import { nftItem } from 'models/item';
import { User } from 'models/user';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from 'redux/hooks';
import { selectFilter } from 'redux/slices/nftFilter';

const useFilterItem = (items: nftItem[], infoUser: User) => {
	const filterPar = useAppSelector(selectFilter);
	const [itemsDisplay, setItemDisplay] = useState<nftItem[]>([]);
	const [itemCreate, setItemCreate] = useState([]);
	const [itemCollected, setItemCollected] = useState([]);
	async function getItemCreateAndCollected() {
		setItemCreate(await getItemCreate(infoUser.userAddress).then((res: any) => res.data));
		setItemCollected(await getItemCollected(infoUser.userAddress).then((res: any) => res.data));
	}
	useEffect(() => {
		console.log('items ', items);
		console.log('itemCollected ', itemCollected);
	}, [itemCollected]);
	useEffect(() => {
		getItemCreateAndCollected();
	}, [infoUser]);
	useEffect(() => {
		if (items.length > 0) {
			let newItemsDisplayArr: any = items;
			if (filterPar.statusRoyal.length === 2) {
				newItemsDisplayArr = itemCreate.concat(itemCollected);
			} else if (filterPar.statusRoyal.length > 0) {
				if (filterPar.statusRoyal.includes(0)) {
					newItemsDisplayArr = itemCollected;
				} else if (filterPar.statusRoyal.includes(1)) {
					newItemsDisplayArr = itemCreate;
				}
			}
			newItemsDisplayArr = newItemsDisplayArr.filter((item: any) => {
				let price = Number(newItemsDisplayArr.price) / 10 ** 8;
				if (filterPar.minPrice !== '' && filterPar.maxPrice !== '') {
					return (
						Number(filterPar.minPrice) <= price &&
						Number(filterPar.maxPrice) >= price &&
						newItemsDisplayArr.status === 1
					);
				} else if (filterPar.minPrice !== '') {
					return Number(filterPar.minPrice) <= price && newItemsDisplayArr.status === 1;
				} else if (filterPar.maxPrice !== '') {
					return Number(filterPar.maxPrice) >= price && newItemsDisplayArr.status === 1;
				}
				return true;
			});

			if (filterPar.status.length > 0) {
				if (filterPar.status.includes(1)) {
					newItemsDisplayArr = newItemsDisplayArr.filter((item: nftItem) => {
						return item.status === 1;
					});
				}
				if (filterPar.status.includes(0)) {
					newItemsDisplayArr.sort((a: any, b: any) => {
						return (
							Number(new Date(b.createdAt).getTime()) -
							Number(new Date(a.createdAt).getTime())
						);
					});
				}
			}
			if (filterPar.collectionId.length > 0) {
				newItemsDisplayArr = newItemsDisplayArr.filter((item: nftItem) => {
					return filterPar.collectionId.includes(item.collectionId);
				});
			}
			if (filterPar.itemName.length > 0) {
				newItemsDisplayArr = newItemsDisplayArr.filter((item: nftItem) => {
					return item.itemName.toLowerCase().indexOf(filterPar.itemName) !== -1;
				});
			}

			setItemDisplay(newItemsDisplayArr);
		}
	}, [items, filterPar]);

	return { itemsDisplay };
};

export default useFilterItem;
