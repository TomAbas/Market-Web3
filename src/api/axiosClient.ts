/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { API_ENDPOINT } from 'constants/api';
import SignMessagesFc from 'hooks/SignMessages';
import { getUserSuccessA } from 'redux/slices/userInfo';
import { dispatch } from 'redux/store';
const axiosClient = axios.create({
	baseURL: API_ENDPOINT,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

axiosClient.interceptors.request.use(
	function (config: any) {
		// Do something before request is sent
		config.headers = {
			...config.headers,
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		};
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
axiosClient.interceptors.response.use(
	function useTest(response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		if (response.config.url === '/users/login') {
			dispatch(getUserSuccessA(response.data.data));
		}
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		if (error.response.status === 401) {
			// do something
			SignMessagesFc();
		}
		return error;
	}
);

export default axiosClient;
