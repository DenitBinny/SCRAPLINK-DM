import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';  // Correct import for Firebase Auth

const firebaseConfig = {
  apiKey: "AIzaSyCMkJwvNisr2OTLfg619o245QPQYZ4jqtA",
  authDomain: "scrapauth.firebaseapp.com",
  projectId: "scrapauth",
  storageBucket: "scrapauth.firebasestorage.app",
  messagingSenderId: "195227893076",
  appId: "1:195227893076:web:3b9b4e268eaaf34c0a9cc1"
};

const app = initializeApp(firebaseConfig);
const scrapauth = getAuth(app);

// Export the Firebase auth instance so you can use it in other files
export { scrapauth };

