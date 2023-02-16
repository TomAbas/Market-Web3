import { toast } from 'react-toastify';
import { useAppDispatch } from 'redux/hooks';
import { getListNftOrders, hasError, startLoading } from 'redux/slices/orderResource';
import { getListItemResource } from 'utils/dataResource';

const useGetNftOrder = () => {
	const dispatch = useAppDispatch();
	async function getListNFTOrders() {
		try {
			dispatch(startLoading());
			let listNftOrders = await getListItemResource();
			console.log(listNftOrders);
			dispatch(getListNftOrders(listNftOrders));
		} catch (error) {
			dispatch(hasError(error));
			toast.error("can't get list orders");
		}
	}
	return { getListNFTOrders };
};
export default useGetNftOrder;
