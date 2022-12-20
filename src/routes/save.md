export default function Router() {
	return useRoutes([
		{
			path: '/',
			element: <LayoutForbitNFTs />,
			children: [
				{ path: '/', element: <Home /> },
				{ path: 'all-nfts', element: <AllNfts /> },
				{ path: 'trending-collections', element: <TrendingCollections /> },
				{ path: 'my-collection', element: <MyCollection /> },
				{ path: 'collections/view/:collectionId', element: <CollectionDetail /> },
				{ path: 'detail/:itemId', element: <ItemDetail /> },
				{ path: `${PATH_PAGE.viewAll}`, element: <ViewAll /> },
				{ path: `${PATH_PAGE.auction}`, element: <AuctionPage /> },
				{
					path: 'info-account/:infoAccountAddress',
					element: <OtherInfoAccount />,
				},
				{
					path: 'my-info-account',
					element: (
						<AccountGuard>
							<MyInfoAccount />
						</AccountGuard>
					),
				},
				{
					path: 'info-account/add-item',
					element: (
						<AccountGuard>
							<CreateOrEditItem />
						</AccountGuard>
					),
				},
				{
					path: 'collections/add-item/collectionId/:collectionId',
					element: (
						<AccountGuard>
							<CreateOrEditItem />
						</AccountGuard>
					),
				},
				{
					path: 'edit-item/itemId/:itemId',
					element: (
						<AccountGuard>
							<CreateOrEditItem />
						</AccountGuard>
					),
				},

				{
					path: 'sell-item/:itemId',
					element: (
						<AccountGuard>
							<SellItem />
						</AccountGuard>
					),
				},
				{
					path: 'collections/create-collection',
					element: (
						<AccountGuard>
							<CreateOrEditCollection />
						</AccountGuard>
					),
				},
				{
					path: 'collections/edit-collection/:collectionId',
					element: (
						<AccountGuard>
							<CreateOrEditCollection />
						</AccountGuard>
					),
				},
				{ path: 'test', element: <TestTheme /> },
				{
					path: '/test-grid',
					element: <TestGrid />,
				},
			],
		},
		{ path: '/404', element: <NotFound /> },
		{ path: '*', element: <Navigate to="/404" replace /> },
	]);
}