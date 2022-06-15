import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig ={
  apiKey: "AIzaSyBJ0-Ktg3bSd1T7DWChhUtROAdXduCGY0k",
  authDomain: "cooking-ninja-site-27809.firebaseapp.com",
  projectId: "cooking-ninja-site-27809",
  storageBucket: "cooking-ninja-site-27809.appspot.com",
  messagingSenderId: "260214092875",
  appId: "1:260214092875:web:fbecde7b6a68e8c39b09ce"
}

firebase.initializeApp(firebaseConfig)

 export const projectFirestore = firebase.firestore()