
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
        element.innerHTML = `   <div class="div-tarjeta">
        <div class="tarjeta">
           
         <button class="btn-especial"> <img src="../../assets/img/icons/boton-agregar.png" alt="" width="100px"></button>
           
            </div>
        </div>
    </div>`
              
        listatemas.appendChild(element);
     
    }
}


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