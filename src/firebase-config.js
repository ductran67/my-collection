// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIpwexc6bVMm_Us1CTJs7t4TFzZFB6xQc",
  authDomain: "my-collection-id.firebaseapp.com",
  projectId: "my-collection-id",
  storageBucket: "my-collection-id.appspot.com",
  messagingSenderId: "969252681173",
  appId: "1:969252681173:web:6bf9ce5df37b4cdac4f95c"
  // apiKey: "AIzaSyChyIBjViFB0P_AVNVWgRznEt3MsLDBI5E",
  // authDomain: "collection-id.firebaseapp.com",
  // projectId: "collection-id",
  // storageBucket: "collection-id.appspot.com",
  // messagingSenderId: "917729628691",
  // appId: "1:917729628691:web:9295eafc353707f69de5e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);