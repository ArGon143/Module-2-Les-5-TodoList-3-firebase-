import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyDkHLSnIGtCqjDqNpRRn_GZkdSCqwLCk08',
	authDomain: 'todolistproject-51c41.firebaseapp.com',
	projectId: 'todolistproject-51c41',
	storageBucket: 'todolistproject-51c41.appspot.com',
	messagingSenderId: '128638657331',
	appId: '1:128638657331:web:fd4d3976f49dee4a635446',
	databaseURL:
		'https://todolistproject-51c41-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
