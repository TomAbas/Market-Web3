import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDEreYfnAXKKBtxnykPEqCdx-E2fFkYxR4',
	authDomain: 'audio-call-demo-04.firebaseapp.com',
	projectId: 'audio-call-demo-04',
	storageBucket: 'audio-call-demo-04.appspot.com',
	messagingSenderId: '1032188065838',
	appId: '1:1032188065838:web:9668aa24a7a337738c87bf',
	measurementId: 'G-6HM159Q5M3',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, app };
