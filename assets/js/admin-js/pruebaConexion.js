
import {app,db,ref,set,get,child,onChildAdded} from "../../js/connection-firebase.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https:www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";
import { contarNiveles,addNivelInTheme} from '../recover-data.js';

export{ insertarDatos}
const auth = getAuth(app);
  
const numNiveles = await contarNiveles();

// pruebaToogle();

// function pruebaToogle(){
// console.log("si entroo")
// addNivelInTheme(6);
// }


// console.log("qui esto"+numNiveles);
function insertarDatos(usuario, id) {
    
    set(ref(db, "Niveles/" + id), usuario)
        .then(() => {
            // alert("Datos registrados correctamente");
            mostrarAlertaGuardado("El nivel se ha creado correctamente", 'success');
        })
        .catch((error) => {
            alert("unsucessfull, error" + error);
        });
}

const elemento = document.getElementById("boton-enviar");
elemento.addEventListener('click',(e)=>{
    //consigueinto numero de nivel actual
    var numeroNivel = document.querySelector(".numNivelActual").id;
    console.log("recibe accion "+ numeroNivel);
    // recuperando datos de los inpust

    var nombre = document.getElementById("nombre-nivel").value;
    var descripcion = document.getElementById("descripcion").value;
    var imag = document.getElementById("urlimagen").value;
// validando los datos
    var datosvalidos = validarUrl(nombre,descripcion, imag);
    console.log("la url es......"+datosvalidos);
    e.preventDefault();

    if(datosvalidos){
//   ingresar los datos a la base de datos
        
        if(numeroNivel==="numeroNivel"){
            console.log("entre a donde es un nuevo nivel");
            var nivel={
                activo:false,
                descripcion: descripcion,
                id:"nivel"+numNiveles,
                imagen:imag,
                nivel:numNiveles,
                titulo:nombre
            }

//          
                console.log("Se envian los datos");
               
                insertarDatos(nivel, "nivel"+numNiveles);

        }else{
        
            console.log("entre donde es nivel ");
            mostrarAlertaGuardado("Se ha editado este nivel", 'question');
            var numconvertido= Number(numeroNivel);
            var nivel={
                activo:false,
                descripcion: descripcion,
                id:"nivel"+numeroNivel,
                imagen:imag,
                nivel:numconvertido,
                titulo:nombre
            }
             insertarDatos(nivel, "nivel"+numeroNivel);
        
        }
    }else{
        if(!datosvalidos){
            // Alerta de que los datos no son validos 
            mostrarAlertaGuardado("Los datos ingresados son invalidos, vuelva a intertar!",'error');
        }

    }






   

});
function validarUrl(titulo, descrip, url){
  var res = false;
  var urlg=/^(ftp|http|https):\/\/[^ "]+$/.test(url);
  var tit=/^\s*[a-zA-Z\s\é\á\í\ó\ú\ñ\Ñ\¿\¡p]{5,60}\s*$/.test(titulo);
  var des=/^\s*[a-zA-Z\s\é\á\í\ó\ú\ñ\Ñ\¿\¡]{5,100}\s*$/.test(descrip);
  console.log(urlg+"  "+ tit+" " +des);
  if((urlg && tit && des) === true){
      res = true;
  }
  return res;
}
function mostrarAlertaGuardado(text, iconn){
    Swal.fire({
        html: text ,
        customClass:'contenido-alerta-crear-nivel',
        timer: 4000,
        padding: '1rem',
        // backdrop:true,
        toast:true,
        icon: iconn,
        width:'300px',
        grow: false,
        position: 'bottom-end',
        allowOutsideClick: false,
        allowEscapeKey: false,
        stopKeydownPropagation: false,
        showConfirmButton: false,
        showCancelButton: false,
        showCloseButton : false,
        
        
    })

}



 
