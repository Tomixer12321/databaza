import "firebase/firestore"
import firebase from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyBf-jzN10nyxYho1I1k4SFSWjGdJHNGmko",
  authDomain: "movies-project-8a7aa.firebaseapp.com",
  projectId: "movies-project-8a7aa",
  storageBucket: "movies-project-8a7aa.appspot.com",
  messagingSenderId: "33600603195",
  appId: "1:33600603195:web:b127de230dded030e7c81e"
};
firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()

export {projectFirestore}