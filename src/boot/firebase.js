import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAl0I3TwRBPAplJcn281MDjVRKbGJv1QsY",
  authDomain: "tatsuki-bettr.firebaseapp.com",
  projectId: "tatsuki-bettr",
  storageBucket: "tatsuki-bettr.appspot.com",
  messagingSenderId: "56634032715",
  appId: "1:56634032715:web:9378308d5b9221f16cc3ce",
};

const app = initializeApp(firebaseConfig);
let db = getFirestore();

export default db;
