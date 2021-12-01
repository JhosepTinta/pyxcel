
import {app,db,ref,set,get,child,onChildAdded} from "../../js/connection-firebase.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https:www.gstatic.com/firebasejs/9.1.2/firebase-auth.js"


const auth = getAuth(app);
   
function insertarDatos(usuario, id) {
    
    set(ref(db, "Niveles/" + id), usuario)
        .then(() => {
            alert("Datos registrados correctamente");
        })
        .catch((error) => {
            alert("unsucessfull, error" + error);
        });
}
var nivel={
    activo:true,
    descripcion:"prueba",
    id:"nivel10",
    imagen:"imagenprueba",
    nivel:10,
    titulo:"titulo prueba"
}
//insertarDatos(nivel,"nivel5");

async function agregarEventoBotonRegistrar(){
      var boton = document.querySelector('#formulario-n');
   
      boton.addEventListener('submit',(e) =>{
      
        //   e.preventDefault();
        //     var nombreNivel = document.querySelector("#nombre-nivel");
        //     var descrip = document.querySelector("#descripcion");
        //     // var imagen = document.querySelector("#files");
        //     var nivel= {
        //         activo:false,
        //         descripcion: descrip.value,
        //         id:"nivel5",
        //         imagen:"//////////",
        //         nivel:5,
        //         titulo:nombreNivel.value
                
        //     };
        //    insertarDatos(nivel, "nivel5");
          
        //   console.log('registro enviado')
          console.log("entra qui");

      });
}
const elemento = document.getElementById("boton-enviar");
elemento.addEventListener('click',function(){
    console.log("recibe accion ");
    var nombre = document.getElementById("nombre-nivel").value;
    var descripcion = document.getElementById("descripcion").value;
    var file = document.getElementById("files").value;
    console.log(nombre);
    console.log(descripcion);
    console.log(file);
    var nivel={
                activo:false,
                descripcion: descripcion,
                id:"nivel5",
                imagen:"//////////",
                nivel:5,
                titulo:nombre
    }
    
    insertarDatos(nivel, "nivel5");
    console.log("Se envian los datos");

})






 
