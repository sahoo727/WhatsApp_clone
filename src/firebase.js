// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtvdcXA2NU-2Afim5178FH30pV-_ZXdGA",
  authDomain: "whatsapp-firebase-da131.firebaseapp.com",
  projectId: "whatsapp-firebase-da131",
  storageBucket: "whatsapp-firebase-da131.appspot.com",
  messagingSenderId: "437427657825",
  appId: "1:437427657825:web:9c4cbfa2c8db5f1eb45e20",
  measurementId: "G-8T7PH4HL2S"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export{auth,provider};
export default db;