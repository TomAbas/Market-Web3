/* eslint-disable @typescript-eslint/no-unused-vars */
function path(root: string, sublink: string) {
	return `${root}${sublink}`;
}

const ROOTS_METASPACECY = 'https://metaspacecy.com/#/';
const ROOTS_COLLECTION = 'https://metaspacecy.com/#//collection';
const ROOTS_ITEM = 'https://metaspacecy.com/#/item';
const ROOTS_AUCTION = 'https://metaspacecy.com/#/auction';
const ROOTS_IGO = 'https://metaspacecy.com/#/igo';
const ROOTS_EARN = 'https://metaspacecy.com/#/earn';
const ROOTS_CATEGORY = 'https://metaspacecy.com/#/view-all';
const ROOTS_VIEWALL = 'https://metaspacecy.com/#/view-all';
const ROOTS_MARKETPLACE = 'https://metaspacecy.com/#/marketplace';
const ROOTS_BOARC = 'https://metaspacecy.com/#/boarc';
const ROOTS_DROP = 'https://metaspacecy.com/#/drops';
const ROOTS_ABOUT = 'https://metaspacecy.com/#/about';
const ROOTS_BLOG = 'https://metaspacecy.com/#/blog';
const ROOTS_VIRTUAL = 'https://virtual.metaspacecy.com/';
// Main routes
export const PATH_PAGE = {
	user: '/user',
	viewAll: '/view-all',
	otherUser: '/other-user',
	mysteryBox: '/mystery-box',
};

export const PATH_MARKETPLACE = {
	root: ROOTS_MARKETPLACE,
};

export const PATH_BOARC = {
	root: ROOTS_BOARC,
};

export const PATH_DROP = {
	root: ROOTS_DROP,
	boarc: path(ROOTS_DROP, '/boarc'),
};

export const PATH_BLOG = {
	root: 'https://metaspacecy.com/#/blog',
};
export const PATH_ABOUT = {
	root: ROOTS_ABOUT,
};

// Route Collection
export const PATH_COLLECTION = {
	root: ROOTS_COLLECTION,
	trending: path(ROOTS_COLLECTION, '/trending'),
	myCollection: path(ROOTS_COLLECTION, '/my-collection'),
	detail: path(ROOTS_COLLECTION, '/detail'),
	createItem: path(ROOTS_COLLECTION, '/create-item'),
	createCollection: path(ROOTS_COLLECTION, '/create-collection'),
	editCollection: path(ROOTS_COLLECTION, '/edit-collection'),
};

// Route Items
export const PATH_ITEM = {
	root: ROOTS_ITEM,
	sell: path(ROOTS_ITEM, '/sell'),
	detail: path(ROOTS_ITEM, '/detail'),
	createItem: path(ROOTS_ITEM, '/create-item'),
	editItem: path(ROOTS_ITEM, '/edit-item'),
};

// Route Auction
export const PATH_AUCTION = {
	root: ROOTS_AUCTION,
	liveOn: path(ROOTS_AUCTION, '/live-on'),
	upComming: path(ROOTS_AUCTION, '/up-coming'),
	completed: path(ROOTS_AUCTION, '/completed'),
	attendance: path(ROOTS_AUCTION, '/attendance'),
	create: path(ROOTS_AUCTION, '/create'),
	permission: path(ROOTS_AUCTION, '/permission'),
	detail: path(ROOTS_AUCTION, '/detail'),
	igo: path(ROOTS_AUCTION, '/igo'),
	testauction: path(ROOTS_AUCTION, '/testauction'),
};

// IGO
export const PATH_IGO = {
	root: ROOTS_IGO,
	create: path(ROOTS_IGO, '/create'),
	request: path(ROOTS_IGO, '/request'),
	detail: path(ROOTS_IGO, '/detail'),
};

//EARN
export const PATH_EARN = {
	assets: path(ROOTS_EARN, '/assets'),
	staking: path(ROOTS_EARN, '/staking'),
	userDetail: path(ROOTS_EARN, '/user-detail'),
};
// CATEGORY
export const PATH_CATEGORY = {
	root: ROOTS_CATEGORY,
	other: path(ROOTS_CATEGORY, '/other'),
	artwork: path(ROOTS_CATEGORY, '/collections'),
	music: path(ROOTS_CATEGORY, '/music'),
	photography: path(ROOTS_CATEGORY, '/photography'),
	games: path(ROOTS_CATEGORY, '/games'),
	sport: path(ROOTS_CATEGORY, '/collections?category=Sport'),
	metaverse: path(ROOTS_CATEGORY, '/metaverse'),
	box: path(ROOTS_CATEGORY, '/box'),
	card: path(ROOTS_CATEGORY, '/card'),
};

// CATEGORY
export const PATH_VIEWALL = {
	root: ROOTS_VIEWALL,
	items: path(ROOTS_VIEWALL, '/items'),
	collections: path(ROOTS_VIEWALL, '/collections'),
	user: path(ROOTS_VIEWALL, '/user'),
};

//VIRTUAL WORLD
export const PATH_VIRTUAL_WORLD = {
	root: ROOTS_VIRTUAL,
	virtualWorld: path(ROOTS_VIRTUAL, '/#/time-square'),
	virtualEvent: path(ROOTS_VIRTUAL, '/#/virtual-event'),
	virtualConcert: path(ROOTS_VIRTUAL, '/#/virtual-concerts'),
	virtualExhibition: path(ROOTS_VIRTUAL, '/#/virtual-exhibition'),
	virtualSport: path(ROOTS_VIRTUAL, '/#/stadium-lusail'),
	virtualArt: path(ROOTS_VIRTUAL, '/#/boarc-gallery'),
	virtualFashionAndLuxury: path(ROOTS_VIRTUAL, '/#/fashion-luxury'),
	eventFifa: 'https://fifa.metaspacecy.com/',
	eventXmax: 'http://virtual.metaspacecy.com/#/xmas',
};
//SOCIAL MEDIA
export const PATH_SOCIAL = {
	discord: 'https://discord.gg/QDEhpR5jDC',
	tele: 'https://t.me/MetaSpacecy',
	twitter: 'https://twitter.com/metaspacecy',
	instagram: 'https://www.instagram.com/metaspacecy_nfts',
	youtube: 'https://www.youtube.com/@metaspacecy',
	facebook: 'https://www.facebook.com/metaspacecy',
	medium: 'https://medium.com/@metaspacecy',
};
