import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBY1sQB_iN_ZibT8fx7NUvn0_RvDMcolXM',
	authDomain: 'aptos-marketplace-a149b.firebaseapp.com',
	projectId: 'aptos-marketplace-a149b',
	storageBucket: 'aptos-marketplace-a149b.appspot.com',
	messagingSenderId: '428781834619',
	appId: '1:428781834619:web:6f61bfdcbdf923ad3eedde',
	measurementId: 'G-F7G27F3N8Z',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, app };
