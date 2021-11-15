//CODIGO DE RECUPERACION DEL USUARIO
//import { initializeApp, onLog } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https:www.gstatic.com/firebasejs/9.4.0/firebase-auth.js"
//import { getDatabase, ref, get, set, child, update, remove, onChildAdded, onChildChanged, onChildRemoved } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-database.js";
import {db,ref,get,child,onChildAdded, app} from "../js/connection-firebase.js";

const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
    let botonIniciarSesion = document.getElementById("botonIniciarSesion");
    let botonUser = document.getElementById("botonIniciarSesion");
    if (user) {
      botonUser.style.display = 'inline-block';
      botonIniciarSesion.style.display = 'none';
      const cont = document.getElementById("logout")
      cont.addEventListener('click', (e) => {
        signOut(auth);
      });
      const dbref = ref(db);
      get(child(dbref, "Usuarios/" + user.uid)).then((snapshot) => {
        console.log(user);
        if (snapshot.exists()) {
          let text = document.getElementById("prueba");
          text.innerHTML = snapshot.val().nombre;
        } else {
          console.log("No se encontro el elemento");
        }
      })
        .catch((error) => {
          console.log("unsucessfull, error" + error);
        });
    } else {
      botonUser.style.display = 'none';
      botonIniciarSesion.style.display = 'block';
    }



  });