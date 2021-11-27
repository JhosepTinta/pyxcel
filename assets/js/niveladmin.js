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
const auth = getAuth(app);
console.log(window.location.pathname)

onAuthStateChanged(auth, (user) => {
  if (user) {
    const dbref = ref(getDatabase());
    get(child(dbref, "Usuarios/" + user.uid)).then((snapshot) => {
      console.log(user);
      if (snapshot.exists()) {
        //const uid = user.email;
        //console.log(uid)
        
        let text = document.getElementById("prueba");
        text.innerHTML = snapshot.val().nombre+'<i class="fas fa-chevron-down"></i>';
        //console.log(snapshot.val().nivelActual);
        //console.log(snapshot.val().nombre);
        recuperarNivelesUsuario();
      } else {
        console.log("No se encontro el elemento");
      }
    })
      .catch((error) => {
        console.log("unsucessfull, error" + error);
      });
  } else {
    // User is signed out
    window.location.href = "/index.html";
    // ...
  }
});

const cont = document.getElementById("logout")

cont.addEventListener('click', (e) => {
  window.location.href = "/index.html";
  signOut(auth);
})

function recuperarNivelesUsuario() {
  const db = getDatabase();
  const commentsRef = ref(db, 'Niveles');
  var contenido = "";
  onChildAdded(commentsRef, (data) => {
    if (data.exists()) {
      //objeto recuperado (se ejecuta n veces hasta que termine de leer todos los niveles)
      const objeto = data.val();
      console.log(objeto);
      var img_text;
      var btn_text;
      img_text = "../assets/img/ulock.png";
      btn_text = "btn btn-success";
      contenido += '<div class="col-lg-3 col-md-6 d-flex align-items-stretch mt-4 mt-lg-4 mt-md-4"><div class="course-item" style="border-style: solid;border-width:3px;border-color:black"><div class="row" style="height:40%"><img src="' + objeto.imagen + '" class="img-fluid" alt="..." style="height:100%" ></div><div class="row course-content" style="height:60%"><div class="d-flex justify-content-between align-items-center mb-3" style="height:40%">';
      contenido += '<h3>' + objeto.titulo + '</h3><div class="testimonial-wrap d-flex justify-content-between align-items-center"><div class="testimonial-item d-flex align-items-center"><img src="';
      contenido += img_text + '"  alt="" style="height:64px;width:64px;"></div></div></div><p>' + objeto.descripcion + '</p><div class="text-center " style="height:20%">' + '<a href="editar_evaluacion.html?id=' + objeto.nivel + '"" class="' + btn_text + '">Editar evaluación</a>';
      contenido += '</div></div></div></div>';

    } else {
      alert("No se encontro el elemento");
    }
    var a = document.getElementById("a");
    a.innerHTML = contenido;

  });
}


