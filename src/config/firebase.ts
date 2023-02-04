import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyD0oqRbn5EY_tzuanXuUrndQ1xrO2pQGMk',
	authDomain: 'idyllic-physics-371204.firebaseapp.com',
	projectId: 'idyllic-physics-371204',
	storageBucket: 'idyllic-physics-371204.appspot.com',
	messagingSenderId: '323363542070',
	appId: '1:323363542070:web:e7cfc46651d0aaf5e4b497',
	measurementId: 'G-QQ6T76ME4E',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, app };
