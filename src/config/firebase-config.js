import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBzkSOyaRlwXrZrluZLLozNR8N7-SNoSCw",
    authDomain: "quizz-app-22747.firebaseapp.com",
    projectId: "quizz-app-22747",
    storageBucket: "quizz-app-22747.appspot.com",
    messagingSenderId: "39747621621",
    appId: "1:39747621621:web:bcff2756b3bf38c968abbc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);
export { db, auth }