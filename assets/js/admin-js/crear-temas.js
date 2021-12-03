import { getDatabase, set ,remove, ref} from '../connection-firebase.js';
import { recuperarTemas, recuperarContenido, recuperarNivel} from '../recover-data.js';
//Variables importantes
// numero = numero del nivel que mostrar la interfaz

const numero=getParameterByName("id");
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

// variable contien el numero de temas
var contador = 1;
// Ingresar datos de nuevo nivel a la base de datos
 const db = getDatabase();
// -----------------------------------------------------
class TarjetaTema{
    constructor(numerotema,titulotema){
        this.numerotema=numerotema;
        this.titulotema=titulotema;
    }
}

function addUltimo(){
    const listatemas = document.getElementById("lista-de-temas");
    const element = document.createElement("form");
    let cadena = contador+"a"+numero;
    element.setAttribute("action","./contenido-tema.html");
    element.setAttribute("method","GET")
    element.innerHTML = `  <button name="temaNuevo" value="${cadena}" class="btn-especial"> 
    <img src="../../assets/img/icons/boton-agregar.png" alt="" width="20%"></button>`
          
    listatemas.appendChild(element);
 
}

function addTema(tarjetatema){
    const listatemas = document.getElementById("lista-de-temas");
    const element = document.createElement("div");
    let cadena = tarjetatema.numerotema[tarjetatema.numerotema.length-1]+"a"+numero;
    console.log(cadena);
    console.log("holaaaaaaaaaaaaaaaaaaaaaaaaaa");
    element.innerHTML = `
            <div class="div-tarjeta" >
                <div class="tarjeta">
                  <form name="tema" action="./contenido-tema.html" value="${tarjetatema.numerotema}" method="GET" >
                     <div name="nivel" value="${cadena}" class="numerotema"><p>Tema:${tarjetatema.numerotema}</p></div>
                     <div class="titulotema"><p>${tarjetatema.titulotema}</p></div>
                     <div class="botones">
                     <button name="tema" value="${cadena}" class="btn" id="btn-editar">Editar</button>
                     <div class="btn" id="btn-eliminar"><img class="delete-content" src="../../assets/img/icons/eliminar.png" width="20px"alt=""> </div>
                    </div>
                  </form>
                </div>
            </div>
        `;
    listatemas.appendChild(element);
    
    
}



await recuperarTemas(numero).then((datos)=>{
    if(datos.exists()){
        console.log(datos.val());
        const objeto = datos.val();
        console.log(objeto);
        for(const elemento in objeto){
            console.log(objeto[elemento].datos.titulo);
            console.log(elemento);
            const tarjetatema= new TarjetaTema( elemento ,objeto[elemento].datos.titulo   );
            addTema(tarjetatema);
            console.log(contador);
            contador++;
        }
      
      
    }
    
    document.querySelectorAll("#btn-eliminar").forEach(component=>{
        addEliminarBotones(component);
    })
       
   addUltimo();  
})
function addEliminarBotones(element){
    element.addEventListener('click', (e)=>{
        console.log("holass......");
        console.log(element.parentNode.parentNode.getAttribute("value"));
        lanzarAlertaBorrar(element.parentNode.parentNode.getAttribute("value"));
        // e.preventDefault();
    })
}
// ------------------------------------------------------c

await recuperarNivel(numero).then((datos) =>{
    if(datos.exists()){
        // console.log("Entro a nivel")
        // console.log(datos.val());
        // console.log(datos.val().titulo);
        document.getElementById("nombre-nivel").value= datos.val().titulo;
        document.getElementById("descripcion").value= datos.val().descripcion;
        document.getElementById("urlimagen").value= datos.val().imagen;
        document.getElementById("numeroNivel").id=datos.val().nivel;
        // console.log("numnivel"+datos.val().nivel);
        // var imprimir= document.getElementById(datos.val().nivel).id;
        // console.log(imprimir);
        // document.getElementById("files").value= datos.val().imagen;
        
    }else{
        
        // addContentToNivel(elementovacio);
    }
})


// -------------------------------------------------------

var enFoco= false;
var esDescrip = false;
var esfile = false;
document.getElementById("nombre-nivel").addEventListener("focus",function(){
    enFoco=true;
    console.log(enFoco);
    const x = document.getElementById("desplegar");
    x.style.display = "block";
});
document.getElementById("nombre-nivel").addEventListener("blur",function(){
    enFoco=false;
    console.log(enFoco);
    const x = document.getElementById("desplegar");
    
    // x.style.display = "none";
    
});

function inciarFoco(){
        enFoco=false;
        console.log(enFoco);
        const x = document.getElementById("desplegar");
        x.style.display = "none";
    
}
inciarFoco();

     
     function verOcultarFormulario(){
        
         const x = document.getElementById("desplegar");
         console.log("karem"+x)
         if(x.style.display=== "none"){
             x.style.display= "block";
     
         }else{
             x.style.display="none";
         }
         console.log("Entro a la funcion");
             
         }

// --------------------------------------------------------
// function handleFileSelect(evt) {
//     var files = evt.target.files; // FileList object

//     // files is a FileList of File objects. List some properties.
//     var output = [];
//     for (var i = 0, f; f = files[i]; i++) {
//       output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
//                   f.size, ' bytes, last modified: ',
//                   f.lastModifiedDate.toLocaleDateString(), '</li>');
//     }
//     document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
//   }

//   document.getElementById('files').addEventListener('change', handleFileSelect, false);

//   ------ALERTA---------------------------------------------
function borrarTemmas(nivelN,temaN){
    remove(ref(db,"Temas/nivel"+ nivelN+"/"+temaN))
    .then(() => {
    //   alert("data removed bien")
    })
    .catch((error) => {
      alert("error")
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: 'El tema no se ha eliminado correctamente!',
        
    //   })
    })
  }

function lanzarAlertaBorrar(temaN){
    Swal.fire({
        title: "¿Estas seguro que deseas eliminar este tema?",
        showCancelButton:true,
        showConfirmButton: true,
        confirmButtonColor:"#5FCF80" ,
        cancelButtonColor:"#DD6B55",
        confirmButtonText: "     Si    ",
         cancelButtonText: "    No    ",
        allowOutsideClick:false,
        customClass: 'ventana-emergente'
    }).then((result) => {
        if(result.isConfirmed){
            Swal.fire('Conformacion de eliminacion')
            borrarTemmas(numero,temaN)
        }else if(result.dismiss){
            Swal.fire('cancelado')
        }

    }) 
}

