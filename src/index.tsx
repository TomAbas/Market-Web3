/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
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
import Mint from 'components/Mint/mint';
import WhiteList from 'components/Drop/drop';
// service worker
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import ProfileUser from 'components/Profile/ProfileUser';
import MyCollection from 'components/MyCollection';
import CollectionDetail from 'components/MyCollection/collectionDetail';
import DetailCard from 'components/Marketplace/DetailCard';
import ViewAll from 'components/Marketplace/ViewAll';

const router = createHashRouter([
	{
		path: '/',
		element: <App />,
		errorElement: (
			<>
				<h1>error test app</h1>
			</>
		),
		children: [
			{
				path: '/',
				element: <Marketplace />,
				errorElement: (
					<>
						<h1>error test market</h1>
					</>
				),
			},
			{
				path: 'mint',
				element: <Mint />,
				errorElement: (
					<>
						<h1>error test mint</h1>
					</>
				),
			},
			{
				path: '/item',
				element: <DetailCard />,
				errorElement: (
					<>
						<h1>error test market</h1>
					</>
				),
			},
			{
				path: '/collection-detail',
				element: <CollectionDetail />,
				errorElement: (
					<>
						<h1>error test market</h1>
					</>
				),
			},
			{
				path: '/drop',
				element: <WhiteList />,
				errorElement: (
					<>
						<h1>error test market</h1>
					</>
				),
			},
			{
				path: 'profile',
				element: <ProfileUser />,
				errorElement: (
					<>
						<h1>error test profile</h1>
					</>
				),
			},
			{
				path: 'myCollection',
				element: <MyCollection />,
				errorElement: (
					<>
						<h1>error test my collection</h1>
					</>
				),
			},
			{
				path: 'view-all',
				element: <ViewAll />,
				errorElement: (
					<>
						<h1>error test view all</h1>
					</>
				),
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
// ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
serviceWorkerRegistration.register();
