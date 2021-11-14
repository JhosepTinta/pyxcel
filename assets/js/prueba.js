import { initializeApp, onLog } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https:www.gstatic.com/firebasejs/9.4.0/firebase-auth.js"
//import { getDatabase} from "./connection-firebase";
import { getDatabase, ref, get, set, child, update, remove, onChildAdded, onChildChanged, onChildRemoved } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAd6JDsbBWEBv_UFCpgNi9zKEjqgiGytTE",
  authDomain: "pyxcel-d6df9.firebaseapp.com",
  databaseURL: "https://pyxcel-d6df9-default-rtdb.firebaseio.com",
  projectId: "pyxcel-d6df9",
  storageBucket: "pyxcel-d6df9.appspot.com",
  messagingSenderId: "953396754317",
  appId: "1:953396754317:web:321620a07c7577f5eb6fc4",
  measurementId: "G-46CQF62KX4"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

onAuthStateChanged(auth, (user) => {
  if (user) {
    const dbref = ref(getDatabase());
    get(child(dbref, "Usuarios/" + user.uid + "/nombre")).then((snapshot) => {
      console.log(user);
      if (snapshot.exists()) {
        //const uid = user.email;
        //console.log(uid)
        
        let text = document.getElementById("prueba");
        text.innerHTML = snapshot.val();
      } else {
        console.log("No se encontro el elemento");
      }
    })
      .catch((error) => {
        console.log("unsucessfull, error" + error);
      });
  } else {
    // User is signed out
    console.log("me sali karen :D")
    window.location.href = "/index.html";
    // ...
  }
});

const cont = document.getElementById("logout")

cont.addEventListener('click', (e) => {
  signOut(auth);
})


