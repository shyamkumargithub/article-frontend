// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAjgfMiHuspRALDIPE9pqHmHQ_7S_Zx0I",
  authDomain: "articleproject-8d26c.firebaseapp.com",
  projectId: "articleproject-8d26c",
  storageBucket: "articleproject-8d26c.appspot.com",
  messagingSenderId: "1087867243669",
  appId: "1:1087867243669:web:dcfb6cc8f41efad68a1f9c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider=new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

const auth=getAuth();
export const authWithGoogle= async()=>{
    let user=null;
    await signInWithPopup(auth,provider)
    .then((result)=>{
        user=result.user
    })
    .catch((err)=>{
        console.log(err)
    })
    return user;
}