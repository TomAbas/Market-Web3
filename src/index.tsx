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
import CollectionDetail from 'components/Marketplace/CollectionDetail/collectionDetail';
import DetailCard from 'components/Marketplace/DetailCard';
import ViewAll from 'components/Marketplace/ViewAll';
import MyCollectionDetail from 'components/CollectionDetail';
import CollectionTrending from 'components/Ranking/CollectionRanking';
import Ranking from 'components/Ranking';
import TopTrader from 'components/Ranking/TopTrader';
import MyItemDetail from 'components/Marketplace/MyItemdetail';
import Collections from 'components/Marketplace/ViewAll/Collections';
import Items from 'components/Marketplace/ViewAll/Items';
import Error from 'components/Error/Error';
import SellItemPage from 'components/Marketplace/SellItemPage/SellItemPage';

const router = createHashRouter([
	{
		element: <App />,
		errorElement: <Error />,
		children: [
			{
				path: '/',
				element: <Marketplace />,
			},
			{
				path: 'mint',
				element: <Mint />,
			},
			{
				path: 'item',
				// element: <DetailCard />,
				children: [
					{
						path: '/item/:itemId',
						element: <DetailCard />,
					},
					{
						path: '/item/sell-item/:itemId',
						element: <SellItemPage />,
					},
				],
			},
			{
				path: '/collection-detail/:collectionId',
				element: <CollectionDetail />,
			},
			{
				path: '/rank',
				element: <Ranking />,
			},
			{
				path: '/drop',
				element: <WhiteList />,
			},
			{
				path: 'profile',
				element: <ProfileUser />,
			},
			{
				path: 'myCollection',
				element: <MyCollection />,
			},
			{
				path: 'view-all',
				element: <ViewAll />,

				children: [
					{
						path: 'collections',
						element: (
							<>
								<Collections />
							</>
						),
					},
					{
						path: 'items',
						element: (
							<>
								<Items />
							</>
						),
					},
				],
			},
			{
				path: 'myCollection/detail',
				element: <MyCollectionDetail />,
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
