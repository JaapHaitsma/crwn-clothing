import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBJGzbGaaMKVZzDdPzmGx2Vbz1CzgXBZx8",
  authDomain: "crwn-db-51781.firebaseapp.com",
  projectId: "crwn-db-51781",
  storageBucket: "crwn-db-51781.appspot.com",
  messagingSenderId: "292602662917",
  appId: "1:292602662917:web:5f6ff11f3d59050c890c6c",
  measurementId: "G-F8X4F0YLP6"
};
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      }); 
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
