import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig1 = {
	apiKey: 'AIzaSyCC43HKE3Ujjz7NI6B_ZARBpDgtUfAbEZc',
	authDomain: 'aptos-12fce.firebaseapp.com',
	projectId: 'aptos-12fce',
	storageBucket: 'aptos-12fce.appspot.com',
	messagingSenderId: '1066404673565',
	appId: '1:1066404673565:web:00a0ec9389cc98568d6ef4',
	measurementId: 'G-XJ6JJMSWXQ',
};

const app1 = initializeApp(firebaseConfig1);
const storage1 = getStorage(app1);

export { app1, storage1 };
