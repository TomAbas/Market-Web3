import axios from 'axios';
import { API_ENDPOINT } from 'constants/api';

const axiosClient = axios.create({
	baseURL: API_ENDPOINT,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default axiosClient;
