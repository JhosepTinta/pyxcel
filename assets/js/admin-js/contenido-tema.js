import { recuperarNivel } from "../recover-data.js";

/*await recuperarNivel(1).then((nivel)=>{
    if(nivel.exists()){
        console.log(nivel.val());
    }else{
        console.log("No se encontro el elemento");
    }
});*/
var activatedForm = false;
var numContent = 2;
colocarEventos();


function innerForm(element){
    //const contenedorTotal = document.querySelector(".content-element");
    const contenedorTotal = element;
    const contenedor = document.createElement("div");
    contenedor.setAttribute("class", "content-form-container");
    //contenedor.setAttribute("class","informacion-contendio")
    const nuevoContenido = `
        <div class="content-form">
            <label for="">Titulo
             <input type="text">
            </label>
            <div>
                <label for="" class="label-area">Descripción
                </label>
                <textarea name="" id="" cols="52" rows="10"></textarea>
            </div>
            <label for="">Imagen
                <input type="text">
            </label>
        </div>
        <div class="icon-save icon-form">
            <img src="../../assets/img/icons/disco-guardar.png" alt="">
        </div>
    `;
    //document.body.innerHTML = nuevoContenido;
    contenedor.innerHTML = nuevoContenido;
    contenedorTotal.appendChild(contenedor);
}

function colocarEventos(){
    let cont = 0;
    document.querySelectorAll(".content").forEach((event)=>{
        event.parentNode.setAttribute("id",cont)
        event.parentNode.setAttribute("value","desactivado")
        console.log(event.parentNode);
        /*event.addEventListener("click",()=>{
            if(activatedForm){
                invisibleForm();
            }else{
                activatedForm = true;
            }
            event.parentNode.setAttribute("value","activado")
            
            console.log(event.parentNode);
            innerForm(event.parentNode);
        })*/
        addEventComponent(event)
        cont ++;
    })
}

function addEventComponent(component){
    component.addEventListener("click",()=>{
        /*console.log(e.target);
        console.log("aaaaaaa")
        console.log(e.target.parentNode)*/
        if(activatedForm){
            invisibleForm();
        }else{
            activatedForm = true;
        }
        component.parentNode.setAttribute("value","activado")
        innerForm(component.parentNode);
    })
}

function invisibleForm(){
    document.querySelectorAll('[value="activado"]').forEach((element)=>{
        //element.classList.add("invisible");
        element.setAttribute("value","desactivado");
        element.removeChild(element.lastElementChild);
        console.log(element.lastElementChild)
    })
}

document.querySelector(".add-content").addEventListener("click",()=>{
    innerComponent();
    
})

function innerComponent(){
    //const contenedorTotal = document.querySelector(".content-element");
    const contenedorTotal = document.querySelector(".content-container");
    const contenedor = document.createElement("div");
    contenedor.setAttribute("class", "content-element");
    contenedor.setAttribute("value","activado");
    numContent++;
    //contenedor.setAttribute("class","informacion-contendio")
    const nuevoContenido = `
        <div id="content" class="content">
            <p>Contenido ${numContent}</p>
            <img class="delete-content" src="../../assets/img/icons/eliminar.png" alt=""> 
        </div>
        <div class="content-form-container">
            <div class="content-form">
                <label for="">Titulo
                <input type="text">
                </label>
                <div>
                    <label for="" class="label-area">Descripción
                    </label>
                    <textarea name="" id="" cols="52" rows="10"></textarea>
                </div>
                <label for="">Imagen
                    <input type="text">
                </label>
            </div>
            <div class="icon-save icon-form">
                <img src="../../assets/img/icons/disco-guardar.png" alt="">
            </div>
        </div>
    `;
    //document.body.innerHTML = nuevoContenido;
    contenedor.innerHTML = nuevoContenido;
    contenedorTotal.appendChild(contenedor);
}

