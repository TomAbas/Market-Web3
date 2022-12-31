/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
// redux
import { store } from './redux/store';
import { Provider } from 'react-redux';
// styled
import './index.css';
import 'swiper/swiper.min.css';
// components
import App from './App';
import Marketplace from 'components/Marketplace';

// service worker
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Marketplace />,
			},
		],
	},
]);
ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
serviceWorkerRegistration.register();
