/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { API_ENDPOINT } from 'constants/api';
import SignMessages from 'hooks/useSignMessages';

const axiosClient = axios.create({
	baseURL: API_ENDPOINT,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

axiosClient.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		return config;
	},
	function (error) {
		// Do something with request error
		console.log('error request');
		return Promise.reject(error);
	}
);

// Add a response interceptor
axiosClient.interceptors.response.use(
	function useTest(response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		if (error.response.status === 401) {
			// do something
			SignMessages();
		}
		return Promise.reject(error);
	}
);

export default axiosClient;
