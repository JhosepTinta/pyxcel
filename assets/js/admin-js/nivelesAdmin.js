import { initializeApp, onLog } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https:www.gstatic.com/firebasejs/9.4.0/firebase-auth.js"
//import { getDatabase} from "./connection-firebase";
import { getDatabase, ref, get, set, child, update, remove, onChildAdded, onChildChanged, onChildRemoved } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-database.js";
import {contarNiveles} from "../recover-data.js"
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
var numNiv=await contarNiveles()-1;
onAuthStateChanged(auth, (user) => {
  if (user) {
    const dbref = ref(getDatabase());
    get(child(dbref, "Usuarios/" + user.uid)).then((snapshot) => {
      console.log(user);
      if (snapshot.exists()) {
        //const uid = user.email;
        //console.log(uid)
        
        let text = document.getElementById("prueba");
        text.innerHTML = snapshot.val().nombre;
        //console.log(snapshot.val().nivelActual);
        //console.log(snapshot.val().nombre);
        recuperarNivelesUsuario(snapshot.val().nivelActual);
        console.log("1");
        botonCancelar();
        console.log(document.querySelectorAll(".borrarN"));
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
  console.log(document.querySelectorAll(".borrarN"));
});

const cont = document.getElementById("logout")

cont.addEventListener('click', (e) => {
  signOut(auth);
})
//cambios
function recuperarNivelesUsuario(nivelActual) {
  const db = getDatabase();
  const commentsRef = ref(db, 'Niveles');
  var contenido = "";
  let cont=1;
  onChildAdded(commentsRef, (data) => {
    if (data.exists()) {
      //objeto recuperado (se ejecuta n veces hasta que termine de leer todos los niveles)
      const objeto = data.val();
      console.log(objeto);
      var img_text;
      var btn_text;
      var alertaEliminar;
      /*if (objeto.nivel<=nivelActual) {
        img_text = "../assets/img/ulock.png";
        btn_text = "btn btn-success";
      } else {
        img_text = "../assets/img/lock.png";
        btn_text = "btn btn-success disabled ";
      }*/
      img_text="/assets/img/cerrar.png";
      btn_text = "btn btn-success";
      //alertaEliminar="eliminarNivel()";

      contenido += '<div class="col-lg-3 col-md-6 d-flex align-items-stretch mt-4 mt-lg-4 mt-md-4"><div class="course-item" style="border-style: solid;border-width:3px;border-color:black"><div class="row" style="height:40%"><img src="' + objeto.imagen + '" class="img-fluid" alt="..." style="height:100%" ></div><div class="row course-content" style="height:60%"><div class="d-flex justify-content-between align-items-center mb-3" style="height:40%">';
      contenido += '<h3>' + objeto.titulo + '</h3><div class="testimonial-wrap d-flex justify-content-between align-items-center"><div class="testimonial-item d-flex align-items-center"><button type="button" class="borrarN"><img src="';
      contenido += img_text + '" class="borrar" alt="" style="height:32px;width:32px;"></button></div></div></div><p>' + objeto.descripcion + '</p><div class="text-center " style="height:20%">' + '<a href="pagina-contenido.html?id=' + objeto.nivel + '"" class="' + btn_text + '">Editar</a>';
      contenido += '</div></div></div></div>';

    } else {
      contenido += '<div class="col-lg-3 col-md-6 d-flex align-items-stretch mt-4 mt-lg-4 mt-md-4"><div class="course-item" style="border-style: solid;border-width:3px;border-color:black"><div class="row" style="height:40%"><input type="image" src="../assets/img/ultimo.png"><p>Titulo<input size="20">Descripcion<input size="15"></p></div></div></div>';
      alert("No se encontro el elemento");
    }/*
    contenido += '<div class="col-lg-3 col-md-6 d-flex align-items-stretch mt-4 mt-lg-4 mt-md-4"><div class="course-item" style="border-style: solid;border-width:3px;border-color:black"><div class="row" style="height:40%"></div></div>';*/
    if(cont==numNiv){
        contenido += '<div class="col-lg-3 col-md-6 d-flex align-items-stretch mt-4 mt-lg-4 mt-md-4"><div class="course-item" style="border-style: solid;border-width:3px;border-color:black"><div class="row" style="height:40%"><p>Titulo<input size="20">Descripcion<input size="15">Imagen <input size="18"></p><button class="agregar" type="button" style="background-color: white; width: 100px; height: 50px; margin: auto;"><img src="/assets/img/ultimo.png" height="40" width="100%"></button></div></div></div>';
    }
    var a = document.getElementById("a");
    a.innerHTML = contenido;
    console.log(numNiv);
    if(cont==numNiv){
      console.log(document.querySelectorAll(".borrarN"));
      botonCancelar();

    }
    cont++;
  });
}
/*document.getElementsByClassName("x").addEventListener("click",(e)=>{
  console.log(e.target);
  
})*/

function botonCancelar(){
  console.log("mañanitas");
  console.log(document.querySelectorAll(".borrarN"));
document.querySelectorAll(".borrarN").forEach(element => {
  element.addEventListener("click",(e)=>{
    let hijo=e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    let padre=e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    //padre.removeChild(hijo);
    console.log("hola");
    Swal.fire({
      title: "Estas seguro que quieres eliminar este nivel",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si"
    }).then((result) => {
      if (result.isConfirmed) {
        padre.removeChild(hijo);
      }
    });
  })
  //console.log(element);
});
}
//temaNuevo();
function temaNuevo(){
  const db = getDatabase();
  const postData = {
    nivel5
  };
  const newPostKey=push(child(ref(db),'Temas')).key;
  const updates={};
  updates['Temas/'+newPostKey]=postData;
  return update(ref(db), updates); 
}
//insertarContenidoEspecifico(4,5,3,{});
function insertarContenidoEspecifico(nroNivel,nroTema,nroContenido,Contenido) {
    /*var objeto={
        nroNivel=4,
        nroTema=5,
        nroContenido=5
    };*/
    const db = getDatabase();
    Contenido={
        descripcion: "Holi",
        imagen: "soy una imagen",
        titulo: "soy un titulo"
    };
    return set(ref(db,`Temas/nivel${nroNivel}/tema${nroTema}/Contenidos/Cont-${nroContenido}`), Contenido)
}
insertarTema(4,7);
function insertarTema(nroNivel,nroTema) {
    const db = getDatabase();
    let temaI="tema"+nroTema;
    let Tema={
        //tema4
    }
    return set(ref(db,`Temas/nivel${nroNivel}/`))
}
/*function eliminarNivel(){
    Swal.fire({
      title: "Estas seguro que quieres eliminar este nivel",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si"
    }).then((result) => {
      if (result.isConfirmed) {
        
      }
    });
}*/