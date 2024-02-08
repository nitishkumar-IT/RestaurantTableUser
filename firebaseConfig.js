import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
//User
const firebaseConfig = {
    apiKey: "AIzaSyDDvFkIpSAKeNfQkZN-PvlUJgBtZlP87M4",
    authDomain: "restaurant-331fc.firebaseapp.com",
    projectId: "restaurant-331fc",
    storageBucket: "restaurant-331fc.appspot.com",
    messagingSenderId: "476215607303",
    appId: "1:476215607303:web:bf21f8fc6f44eedb0c6aa2",
    measurementId: "G-ZYGG5CV78V",
    databaseURL: "https://restaurant-331fc-default-rtdb.asia-southeast1.firebasedatabase.app",
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
  
  export { auth, db };