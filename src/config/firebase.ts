import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDPjJTdxRuxkWNz89VJJOrIimOQsQk3bBc',
	authDomain: 'aptos-354fd.firebaseapp.com',
	projectId: 'aptos-354fd',
	storageBucket: 'aptos-354fd.appspot.com',
	messagingSenderId: '930009972913',
	appId: '1:930009972913:web:556768431b503830e0e290',
	measurementId: 'G-2G32M14RRL',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, app };
