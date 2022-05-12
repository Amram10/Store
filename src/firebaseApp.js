import firebase from 'firebase/app'
import 'firebase/firebase-firestore'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmS9Pw9WL_J1YRamx8wkXV8b7TJhn3RL8",
  authDomain: "store-project-40d1a.firebaseapp.com",
  projectId: "store-project-40d1a",
  storageBucket: "store-project-40d1a.appspot.com",
  messagingSenderId: "987332794728",
  appId: "1:987332794728:web:f322c41fc008e3ec171edd"
};
firebase.initializeApp(firebaseConfig)

export default firebase;