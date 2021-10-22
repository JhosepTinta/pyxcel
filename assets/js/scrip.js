import {recuperarDatos,contarTemas,recuperarIntroduccion,recuperarTituloNivel} from "./recover-data.js";
export {PonerContenido,agregarIntroduccionContenido,ponerTitulo,ponerTituloNivel}
contarTemas();
const nivelActual = 1;


let temaActual =1;
let cantTemas = 0;

recuperarTituloNivel("Niveles/nivel",nivelActual);
pintarTituloTema(temaActual);
ponerFuncionesBotones();
cotrolarVisibilidadBotones();


function pintarTituloTema(numeroTema){  /*cada que se haga click sobre un boton (anterior,siguiente) o sobre el muno lateral,este metodo se ejecutara*/
    var botonesTemas  = document.querySelectorAll('.tema-del-nivel');
    botonesTemas.forEach(b =>{
        if(numeroTema == b.value){
            b.classList.add('tema-seleccionado');
        }else{
            b.classList.remove('tema-seleccionado');
        }
    });
    cotrolarVisibilidadBotones();
    /*PONER AQUI EL METODO PARA CAMBIAR EL CONTENDIO DEL TEMA*/
    let aux = "Contenidos/Cont-1";
    limpiarContenido();
    recuperarIntroduccion("Temas/nivel1/tema",temaActual);
    recuperarDatos("Temas","nivel1/tema",numeroTema);

}

function limpiarContenido(){
    var elemento = document.getElementById("a");
    const contenedor = document.createElement("div");
    contenedor.setAttribute("class","informacion-contenido");
    contenedor.setAttribute("id","a");
    console.log(contenedor);
    elemento.replaceWith(contenedor);
}
function agregarIntroduccionContenido(tituloTema){
    const titulo = document.querySelector(".titulo-del-contenido h1");
    titulo.textContent = tituloTema;
}

function PonerContenido(tituloTema , contenidoTema,imagen){ 

    const contenedorTotal = document.getElementById("a");
    const contenedor = document.createElement("div");
    contenedor.setAttribute("id", "contenedor");
    //contenedor.setAttribute("class","informacion-contendio")
    const nuevoContenido = `
            <h2>${tituloTema}</h2>
            <p>${contenidoTema}</p>
            <img src="${imagen}" width="450px" style="margin-left:100px"><img>
    `;
    //document.body.innerHTML = nuevoContenido;
    contenedor.innerHTML = nuevoContenido;
    contenedorTotal.appendChild(contenedor);
}

function ponerTitulo(item,aux){ /* lista de  nombres de temas  ordenados {tema1,tema2,tema3.....*/
    var listaTemas = document.querySelector('.lista-temas');
    var templateTituloTema = document.querySelector('.template-tema-nivel').content;
    var fragmentTemas = document.createDocumentFragment();
        templateTituloTema.querySelector('.tema-del-nivel').textContent = item;
        templateTituloTema.querySelector('.tema-del-nivel').value = aux++;
        fragmentTemas.appendChild (templateTituloTema.cloneNode(true)); 

    listaTemas.appendChild(fragmentTemas);

    const botonesTemas = document.querySelectorAll('.tema-del-nivel');
    botonesTemas.forEach(boton =>{
        boton.addEventListener('click',(e) =>{
            temaActual=e.target.value;
            pintarTituloTema(e.target.value);
            $('.titulo-del-contenido').animate({scrollTop:0}, 'slow');
        });
    });
    cantTemas++;
}

function ponerTituloNivel(tituloNivel){
    var barraMenu = document.querySelector('.poner-titulo-nivel');
    var templateTituloNivel = document.querySelector('.template-titulo-nivel').content;
    var fragmentNivel = document.createDocumentFragment();
    templateTituloNivel.querySelector('h2').textContent = tituloNivel;
    fragmentNivel.appendChild(templateTituloNivel.cloneNode(true));
    barraMenu.appendChild(fragmentNivel);
}

function ponerFuncionesBotones(){ /*se agregara un eventlistener a los botones atras y sigiente*/

    var botonAnterior = document.querySelector('.boton-anterior');
    var botonSiguiente = document.querySelector('.boton-siguiente');

    botonAnterior.addEventListener('click',()=>{ 
        let aux = temaActual;
        aux --;
        if(aux >= 1 ){
            temaActual--;
            pintarTituloTema(temaActual);
        }
        $('.titulo-del-contenido').animate({scrollTop:0}, 'slow');
        cotrolarVisibilidadBotones();
    });

     botonSiguiente.addEventListener('click',()=>{ 
        let aux = temaActual;
        aux ++;
        if(aux <= cantTemas ){
            temaActual++;
            pintarTituloTema(temaActual);
        }
        $('.titulo-del-contenido').animate({scrollTop:0}, 'slow');
        cotrolarVisibilidadBotones();
    });
}
function cotrolarVisibilidadBotones(){
    var botonAnterior = document.querySelector('.boton-anterior');
    var botonSiguiente = document.querySelector('.boton-siguiente');
    if(temaActual == 1){
        botonAnterior.classList.add('oculto');
    }else{
        botonAnterior.classList.remove('oculto');
    }

    if(temaActual == cantTemas){
        botonSiguiente.classList.add('oculto');
    }else{
        botonSiguiente.classList.remove('oculto');
    }
}
