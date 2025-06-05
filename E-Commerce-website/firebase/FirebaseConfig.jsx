import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyBIxPPzpz-EZD0YxCjV0vI1cJG_bPpWkpk",
  authDomain: "my-ecommerce-pro-aece9.firebaseapp.com",
  projectId: "my-ecommerce-pro-aece9",
  storageBucket: "my-ecommerce-pro-aece9.firebasestorage.app",
  messagingSenderId: "29665554898",
  appId: "1:29665554898:web:be3dbf6b79a95190e3580b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDb=getFirestore(app);
const auth = getAuth(app);
export { fireDb, auth };