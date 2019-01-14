import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/database"
import "firebase/storage"

var config = {
  apiKey: "AIzaSyDdFdSwq9V1Z1tR-fAcBPw2C9Fv866WGj8",
  authDomain: "react-chat-app-4ff2c.firebaseapp.com",
  databaseURL: "https://react-chat-app-4ff2c.firebaseio.com",
  projectId: "react-chat-app-4ff2c",
  storageBucket: "react-chat-app-4ff2c.appspot.com",
  messagingSenderId: "925801270785"
};
firebase.initializeApp(config);

export default firebase
