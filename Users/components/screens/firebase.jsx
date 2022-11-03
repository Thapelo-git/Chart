import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/database'

const fire = firebase.initializeApp({
    apiKey: "AIzaSyA-kJPXsOA5sBlV2mG--pHMxLUUnPs4CQA",
    authDomain: "newtodo-e1bcc.firebaseapp.com",
    databaseURL: "https://newtodo-e1bcc-default-rtdb.firebaseio.com",
    projectId: "newtodo-e1bcc",
    storageBucket: "newtodo-e1bcc.appspot.com",
    messagingSenderId: "939350367161",
    appId: "1:939350367161:web:87a3ba85a043b2f71ef468",
    measurementId: "G-VXXM3CEDC7"
  });
  
  // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);
export const auth = fire.auth();
export const storage= firebase.storage()

export const db=firebase.database();
export default {fire,firebase};