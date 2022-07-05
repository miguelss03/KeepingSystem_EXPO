import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
    apiKey: "AIzaSyApDd8j3OmzTKjpFMRHoD9DlzWs6j2ke9o",
    authDomain: "mydatabase-a42d8.firebaseapp.com",
    databaseURL: "https://mydatabase-a42d8.firebaseio.com",
    projectId: "mydatabase-a42d8",
    storageBucket: "mydatabase-a42d8.appspot.com",
    messagingSenderId: "869116207683",
    appId: "1:869116207683:web:6528e86f0b118f341ceaf6",
    measurementId: "G-T5XGE3HF6P"
  };

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}  
  export default firebase;