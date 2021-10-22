const nivelActual = 1;

let temaActual =1;
let cantTemas = 3;

var pruebaTextoHTML ='<p>JavaScript es el lenguaje de programación que debes usar para añadir características interactivas a tu sitio web, (por ejemplo, juegos, eventos que ocurren cuando los botones son presionados o los datos son introducidos en los formularios, efectos de estilo dinámicos, animación, y mucho más). Este artículo te ayudará a comenzar con este lenguaje extraordinario y te dará una idea de qué es posible hacer con él.</p><h2>¿Qué es JavaScript realmente?</h2><p>JavaScript es un robusto lenguaje de programación que se puede aplicar a un documento HTML y usarse para crear interactividad dinámica en los sitios web. Fue inventado por Brendan Eich, cofundador del proyecto Mozilla, Mozilla Foundation y la Corporación Mozilla.</p><p>Puedes hacer casi cualquier cosa con JavaScript. Puedes empezar con pequeñas cosas como carruseles, galerías de imágenes, diseños fluctuantes, y respuestas a las pulsaciones de botones. Con más experiencia, serás capaz de crear juegos, animaciones 2D y gráficos 3D, aplicaciones integradas basadas en bases de datos ¡y mucho más!</p><p>JavaScript por sí solo es bastante compacto aunque muy flexible, y los desarrolladores han escrito gran cantidad de herramientas encima del núcleo del lenguaje JavaScript, desbloqueando una gran cantidad de funcionalidad adicional con un mínimo esfuerzo. Esto incluye:</p><p>Marcos de trabajo y librerías de terceros que puedes aplicar a tu HTML para que puedas construir y publicar rápidamente sitios y aplicaciones. </p><img src="https://miro.medium.com/max/2560/1*rhtkNOK43I8U1TCPnQLBJg.jpeg" width="400" ><h2>Ejemplo «¡Hola Mundo!» </h2><p>La sección de arriba suena realmente emocionante, y debería serlo. JavaScript es una de las tecnologías web más emocionantes, y cuando comiences a ser bueno en su uso, tus sitios web entrarán en una nueva dimensión de energía y creatividad.</p><p>Sin embargo, sentirse cómodo con JavaScript es un poco más difícil que sentirse cómodo con HTML y CSS. Deberás comenzar poco a poco y continuar trabajando en pasos pequeños y consistentes. Para comenzar, mostraremos cómo añadir JavaScript básico a tu página, creando un «¡Hola Mundo!» de ejemplo (el estándar en los ejemplos básicos de programación).</p>';
var cont2= '<p> *----contenido del tema 2 ------* </p>';
var cont3= '<p> *----contenido del tema 3 ------* </p>';

ponerTituloNivel('Nivel 1: Base de datos');
ponerTitulosTemas(['tema 1','tema 2','tema 3']);

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
    if (temaActual == 1) {
         PonerContenido('TEMA1',pruebaTextoHTML); /*En esta esta parte deberian ir info sacada de la base de datos*/
    }
    if (temaActual == 2) {
         PonerContenido('TEMA2',cont2); /*En esta esta parte deberian ir info sacada de la base de datos*/
    }
    if (temaActual == 3) {
         PonerContenido('TEMA3',cont3); /*En esta esta parte deberian ir info sacada de la base de datos*/
    }
   

}

function PonerContenido(tituloTema , contenidoTema){ 

     var contenidoTituloTema = document.querySelector('.titulo-del-contenido');
    var contenidoDelTema = document.querySelector('.informacion-contenido');

    contenidoTituloTema.querySelector('h1').textContent = tituloTema;
    contenidoDelTema.innerHTML=contenidoTema;

}

function ponerTitulosTemas(ArrayDeTemas){ /* lista de  nombres de temas  ordenados {tema1,tema2,tema3.....*/
    if(!Array.isArray(ArrayDeTemas)){
        throw TypeError('El argumento en el metodo ponerTituloTema debe ser un array de string');
    }

    var listaTemas = document.querySelector('.lista-temas');
    var templateTituloTema = document.querySelector('.template-tema-nivel').content;
    var fragmentTemas = document.createDocumentFragment();
    let aux=1;
    ArrayDeTemas.forEach(item =>{
        templateTituloTema.querySelector('.tema-del-nivel').textContent = item;
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

