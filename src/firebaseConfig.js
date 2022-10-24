// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCP2EHwgXhLbgmF_ZRjL6sK78mFQUQ13sc",
//   authDomain: "aceitera-emanuel.firebaseapp.com",
//   projectId: "aceitera-emanuel",
//   storageBucket: "aceitera-emanuel.appspot.com",
//   messagingSenderId: "161442693754",
//   appId: "1:161442693754:web:3f8331b090e6c3466d31c3"
// };

// Initialize Firebase
const app = initializeApp ({
  apiKey: "AIzaSyCP2EHwgXhLbgmF_ZRjL6sK78mFQUQ13sc",
  authDomain: "aceitera-emanuel.firebaseapp.com",
  projectId: "aceitera-emanuel",
  storageBucket: "aceitera-emanuel.appspot.com",
  messagingSenderId: "161442693754",
  appId: "1:161442693754:web:3f8331b090e6c3466d31c3"
});

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
// Firebase storage reference
const storage = getStorage(app);
export default storage;