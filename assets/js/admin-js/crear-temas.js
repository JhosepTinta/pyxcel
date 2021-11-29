import { recuperarTemas, recuperarContenido } from '../recover-data.js';
recuperarContenido(1,2);
class TarjetaTema{
    constructor(numerotema,titulotema){
        this.numerotema=numerotema;
        this.titulotema=titulotema;
    }
}
class MostrarUI{
    addTema(tarjetatema){
        const listatemas = document.getElementById("lista-de-temas");
        const element = document.createElement("div");
        element.innerHTML = `
                <div class="div-tarjeta">
                    <div class="tarjeta">
                     
                       <div class="numerotema"><p>${tarjetatema.numerotema}</p></div>
                        <div class="titulotema"><p>${tarjetatema.titulotema}</p></div>
                       <div class="botones">
                         <button class="btn" id="btn-editar">Editar </button>
                         <button class="btn" id="btn-eliminar">Eliminar </button>
                        </div>
                    </div>
                </div>
            `;
        listatemas.appendChild(element);
    }
    addUltimo(){
        const listatemas = document.getElementById("lista-de-temas");
        const element = document.createElement("div");
        element.innerHTML = `  <button class="btn-especial"> 
        <img src="../../assets/img/icons/boton-agregar.png" alt="" width="100px"></button>`
              
        listatemas.appendChild(element);
     
    }
}
function addUltimo(){
    const listatemas = document.getElementById("lista-de-temas");
    const element = document.createElement("div");
    element.innerHTML = `  <button class="btn-especial"> 
    <img src="../../assets/img/icons/boton-agregar.png" alt="" width="100px"></button>`
          
    listatemas.appendChild(element);
 
}
function addTema(tarjetatema){
    const listatemas = document.getElementById("lista-de-temas");
    const element = document.createElement("div");
    element.innerHTML = `
            <div class="div-tarjeta">
                <div class="tarjeta">
                 
                   <div class="numerotema"><p>${tarjetatema.numerotema}</p></div>
                    <div class="titulotema"><p>${tarjetatema.titulotema}</p></div>
                   <div class="botones">
                     <button class="btn" id="btn-editar">Editar </button>
                     <button class="btn" id="btn-eliminar">Eliminar </button>
                    </div>
                </div>
            </div>
        `;
    listatemas.appendChild(element);
}
var contador = 1;
await recuperarTemas(1).then((datos)=>{
    if(datos.exists()){
        console.log(datos.val());
        const objeto = datos.val();
        console.log(objeto);
        for(const elemento in objeto){
            console.log(objeto[elemento].datos.titulo);
            
            const tarjetatema= new TarjetaTema( 'Tema: '+ contador  ,objeto[elemento].datos.titulo   );
            addTema(tarjetatema);
            console.log(contador);
            contador++;
        }
       addUltimo();
        // console.log(datos.val().tema1.datos.titulo);
        
        // const contenedor = new MostrarUI();
            // const obj = snapshot.val().Contenidos; 
            // for(const elemento in obj){
            //     console.log(obj);
            //     PonerContenido(obj[elemento].titulo,obj[elemento].descripcion,obj[elemento].imagen);
            // }
        
       
    // contenedor.addUltimo()
    // e.preventDefault();
    }
})
console.log("mira");
document.getElementById('boton-alerta-prueba').addEventListener('click',function(e){
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
        }else if(result.dismiss){
            Swal.fire('cancelado')
        }

    }) 


})
// document.getElementById('nombretitulo').innerHTML=()
// Evento que sucedera 
document.getElementById('product-form').addEventListener('submit',function(e){
    
    const titulo = document.getElementById('tema').value;
    const numerotema= document.getElementById('name').value;
    const tarjetatema= new TarjetaTema(titulo,numerotema);

    const contenedor = new MostrarUI();

    contenedor.addTema(tarjetatema);
    // contenedor.addUltimo()
    e.preventDefault();
});
// let botonEliminar = document.getElementById("btn-eliminar");
// // console.log("presionaste eliminar");
// botonEliminar.addEventListener("click",function(){
    
//     Swal.fire({
//         title: "Realmente desea salir de la evaluacion?",
//         showCancelButton: true,
//         confirmButtonText: "si salir",
//         cancelButtonText: "cancelar",
//     })
    

// })