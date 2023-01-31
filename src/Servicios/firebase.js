import { getStorage } from "firebase/storage";
import 'firebase/firestore'
import "firebase/compat/storage"
import "firebase/compat/firestore"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCP2EHwgXhLbgmF_ZRjL6sK78mFQUQ13sc",
  authDomain: "aceitera-emanuel.firebaseapp.com",
  projectId: "aceitera-emanuel",
  storageBucket: "aceitera-emanuel.appspot.com",
  messagingSenderId: "161442693754",
  appId: "1:161442693754:web:ac486b7a2cc96dd16d31c3"
};

// Initialize Firebase
const appInitializate = initializeApp(firebaseConfig);

const storage = getStorage(appInitializate);

export { appInitializate, storage }