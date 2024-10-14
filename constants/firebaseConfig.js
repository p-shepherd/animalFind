import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyD0JzLoBF54yJ7BDMDEDbLGTPN_sgcYJn0",
  authDomain: "animalfind-239c0.firebaseapp.com",
  projectId: "animalfind-239c0",
  storageBucket: "animalfind-239c0.appspot.com",
  messagingSenderId: "168448121889",
  appId: "1:168448121889:web:bbb904534e725627709760",
  measurementId: "G-JEYRFMF48B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { app, auth };
