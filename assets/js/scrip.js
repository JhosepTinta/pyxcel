/* estilos para pagina-contenido.html*/
import{getTituloNivel,getNombresTemasNivel,getContenidoTema} from "../js/recover-data.js";
export{incializar}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var codNivel = getParameterByName('id');
var codigosTemas = [];
var nombreTemas =  [] ;
var temaActual = 1;
let cantTemas = 0;


async function incializar(){

        nombreTemas = await getNombresTemasNivel(codNivel);
         //   console.log(element.ref._path.pieces_[2])
        cantTemas =  nombreTemas.length;
        var tituloNivel= await getTituloNivel(codNivel);
        ponerTituloNivel(tituloNivel);
        ponerTitulosTemas(nombreTemas);
        pintarTituloTema(temaActual);
        ponerFuncionesBotones();
        cotrolarVisibilidadBotones();
}

async function pintarTituloTema(numeroTema){  /*cada que se haga click sobre un boton (anterior,siguiente) o sobre el muno lateral,este metodo se ejecutara*/
    var botonesTemas  = document.querySelectorAll('.tema-del-nivel');
    botonesTemas.forEach(b =>{
        if(numeroTema == b.value){
            b.classList.add('tema-seleccionado');
        }else{
            b.classList.remove('tema-seleccionado');
        }
    });
    cotrolarVisibilidadBotones();

    var contTema = await getContenidoTema(codNivel, codigosTemas[numeroTema-1]);
    


    PonerContenido(nombreTemas[numeroTema-1],contTema); /*En esta esta parte deberian ir info sacada de la base de datos*/

}

function PonerContenido(tituloTema , contenidoTema){ 
    var contenidoTituloTema = document.querySelector('.titulo-del-contenido');
    var contenidoDelTema = document.querySelector('.informacion-contenido');
    contenidoTituloTema.querySelector('h1').textContent = tituloTema.val().datos.titulo;
    contenidoDelTema.innerHTML=contenidoTema;
}

async function ponerTitulosTemas(ArrayDeTemas){ /* lista de  nombres de temas  ordenados {tema1,tema2,tema3.....*/
     var ArraySoloTitulosTema = [] ;
     while(codigosTemas.length > 0){
        codigosTemas.pop();
    }
     ArrayDeTemas.forEach(element => {
         ArraySoloTitulosTema.push(element.val())
         codigosTemas.push(element.ref._path.pieces_[2]);
     });

    var listaTemas = document.querySelector('.lista-temas');
    var templateTituloTema = document.querySelector('.template-tema-nivel').content;
    var fragmentTemas = document.createDocumentFragment();
    let aux=1;

    ArraySoloTitulosTema.forEach(item =>{
        templateTituloTema.querySelector('.tema-del-nivel').textContent = item.datos.titulo;
        templateTituloTema.querySelector('.tema-del-nivel').value = aux++;
        fragmentTemas.appendChild (templateTituloTema.cloneNode(true)); 
    });

    listaTemas.appendChild(fragmentTemas);

    const botonesTemas = document.querySelectorAll('.tema-del-nivel');
    botonesTemas.forEach(boton =>{
        boton.addEventListener('click',(e) =>{
            temaActual=e.target.value;
            pintarTituloTema(e.target.value);
        });
    });
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
        cotrolarVisibilidadBotones();
    });

     botonSiguiente.addEventListener('click',()=>{ 
        let aux = temaActual;
        aux ++;
        if(aux <= cantTemas ){
            temaActual++;
            pintarTituloTema(temaActual);
        }
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