
import {app,db,ref,set,get,child,onChildAdded} from "../../js/connection-firebase.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https:www.gstatic.com/firebasejs/9.1.2/firebase-auth.js"
import { contarNiveles} from '../recover-data.js';

export{ insertarDatos}
const auth = getAuth(app);
  
const numNiveles = await contarNiveles();


console.log("qui esto"+numNiveles);
function insertarDatos(usuario, id) {
    
    set(ref(db, "Niveles/" + id), usuario)
        .then(() => {
            alert("Datos registrados correctamente");
        })
        .catch((error) => {
            alert("unsucessfull, error" + error);
        });
}
// var nivel={
//     activo:true,
//     descripcion:"prueba",
//     id:"nivel10",
//     imagen:"imagenprueba",
//     nivel:10,
//     titulo:"titulo prueba"
// }
const elemento = document.getElementById("boton-enviar");
elemento.addEventListener('click',function(){
    //consiguiendo numero de nivel para editar 
    var numeroNivel = document.querySelector(".numNivelActual").id;
    
    console.log("recibe accion "+ numeroNivel);


    var nombre = document.getElementById("nombre-nivel").value;
    var descripcion = document.getElementById("descripcion").value;
    var file = document.getElementById("files").value;


    actualizarDatosTema(numNivel,nunTema,{
                  titulo: title
              }).then(() => {
                  alert("Contenido registrado correctamente");
              })
              .catch((error) => {
                  alert("unsucessfull, error" + error);
              });

    console.log(nombre);
    console.log(descripcion);
    console.log(file);
    var nivel={
                activo:false,
                descripcion: descripcion,
                id:"nivel"+numNiveles,
                imagen:"//////////",
                nivel:numNiveles,
                titulo:nombre
    }
    
    // insertarDatos(nivel, "nivel"+numNiveles);
    console.log("Se envian los datos");

});




// function addEventTitleSave(element){
//     element.addEventListener("click",()=>{
//       let titleElement = document.querySelector(".title-container input");
//       let title = titleElement.value;
//       actualizarDatosTema(numNivel,nunTema,{
//           titulo: title
//       }).then(() => {
//           alert("Contenido registrado correctamente");
//       })
//       .catch((error) => {
//           alert("unsucessfull, error" + error);
//       });
//     });
// }


 
