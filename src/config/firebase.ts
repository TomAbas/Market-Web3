import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyARuA9mLlIIUsdDya6w2fPYTBlfEwHxKDk',
	authDomain: 'aptos-marketplace-e4267.firebaseapp.com',
	projectId: 'aptos-marketplace-e4267',
	storageBucket: 'aptos-marketplace-e4267.appspot.com',
	messagingSenderId: '696407840688',
	appId: '1:696407840688:web:8eae045064508b7cec6875',
	measurementId: 'G-X661WSD5BB',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, app };
