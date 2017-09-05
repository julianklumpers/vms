import firebase from 'firebase'

 const config = {
    apiKey: "AIzaSyB1l16Rk11OEbNgcylbmwfRNODxfOw92Eg",
    authDomain: "koppert-vms.firebaseapp.com",
    databaseURL: "https://koppert-vms.firebaseio.com",
    projectId: "koppert-vms",
    storageBucket: "koppert-vms.appspot.com",
    messagingSenderId: "875865895172"
  }

  firebase.initializeApp(config);

  export const database     = firebase.database()
  export const authenticate = firebase.auth()