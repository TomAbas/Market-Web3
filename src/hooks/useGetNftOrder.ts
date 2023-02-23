import { toast } from 'react-toastify';
import { useAppDispatch } from 'redux/hooks';
import { getListNftOrders, hasError, startLoading } from 'redux/slices/orderResource';
import { getTokenFromResource } from '../service/aptos.service';

const useGetNftOrder = () => {
	const dispatch = useAppDispatch();
	async function getListNFTOrders() {
		try {
			dispatch(startLoading());
			let listNftOrders = await getTokenFromResource();
			dispatch(getListNftOrders(listNftOrders));
		} catch (error) {
			dispatch(hasError(error));
			toast.error('Can not get list of orders');
		}
	}
	return { getListNFTOrders };
};
export default useGetNftOrder;
