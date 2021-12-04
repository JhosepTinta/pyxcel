import { initializeApp, onLog } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https:www.gstatic.com/firebasejs/9.4.0/firebase-auth.js"
import { getDatabase, ref, get, set, child, update, remove, onChildAdded, onChildChanged, onChildRemoved ,serverTimestamp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAd6JDsbBWEBv_UFCpgNi9zKEjqgiGytTE",
  authDomain: "pyxcel-d6df9.firebaseapp.com",
  databaseURL: "https://pyxcel-d6df9-default-rtdb.firebaseio.com",
  projectId: "pyxcel-d6df9",
  storageBucket: "pyxcel-d6df9.appspot.com",
  messagingSenderId: "953396754317",
  appId: "1:953396754317:web:321620a07c7577f5eb6fc4",
  measurementId: "G-46CQF62KX4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

var idUser = null;
var estrellasComentar = document.querySelector(".estrellas-comentar1");
var cajaTextoComentar =document.querySelector(".text-area-comentar");
var botonesEnviarCancelarComentar =document.querySelector(".botones-enviar-cancelar");
var botonesEditarEliminarComentar = document.querySelector(".botones-editar-eliminar");
var botonDarOpinion = document.querySelector(".boton-agregar-comentario");
var contadorLetras = document.querySelector(".contador-letras");
var comentariosCargados = 0;
var arrayListComentarios = [];
var nombreUsr = "";
var editando = 0;

async function inicializarSeccionComentarios(){
  
  await obtenerComentariosFireBase();
  cargarComentarios(3);

  ponerFuncionesBotonesComentar();
  calcularEstadisticas();
  ponerFuncionalidadMarcarEstrellas();
  cargarSeccionCalificaCurso();

  var aux = document.querySelector(".main-comentarios");
  aux.classList.remove("oculto");
}

function calcularEstadisticas(){
  var texto = document.querySelector(".texto-cantidad-califiaciones");
  var suma = 0;
  var cantComent=0;
  var resultado = 0;
  var cante1=0;
  var cante2=0;
  var cante3=0;
  var cante4=0;
  var cante5=0;
   arrayListComentarios.forEach(element => {
     if (element.calificacion >= 0 && element.calificacion <=5) {
      suma = suma+element.calificacion
      cantComent++;
      switch (element.calificacion) {
         case 1:
          cante1++;
         break;
         case 2:
          cante2++;
         break;
         case 3:
          cante3++;
         break;
         case 4:
          cante4++;
         break;
         case 5:
          cante5++;
         break;
      }
     }
   });
   if (cantComent > 0) {
     resultado = suma / cantComent;
     cante1 = ((cante1*100)/cantComent).toFixed(1);
     cante2 = ((cante2*100)/cantComent).toFixed(1);
     cante3 = ((cante3*100)/cantComent).toFixed(1);
     cante4 = ((cante4*100)/cantComent).toFixed(1);
     cante5 = ((cante5*100)/cantComent).toFixed(1); 
     ponerEstadisticasBarras([cante5+"%" ,cante4+"%",cante3+"%",cante2+"%",cante1+"%"]);
     ponerPuntajeEstadistica(resultado.toFixed(1));
     texto.textContent = cantComent+" Califiaciones"
    }
    if (cantComent== 0) {
      resultado = 0;
      ponerEstadisticasBarras(["0%" ,"0%","0%","0%","0%"]);
      ponerPuntajeEstadistica(resultado);
      texto.textContent = cantComent+" Califiaciones"
     }
}
async function obtenerComentariosFireBase(){
  var  aux = await getDireccion("Comentarios");
  var encon = 0 ;
   while(arrayListComentarios.length > 0){
     arrayListComentarios.pop();
   }
  aux.forEach(element => {
      var user ={
          uderId : element.ref._path.pieces_[1],
          calificacion:element.val().calificacion,
          comentario:element.val().comentario,
          fecha: element.val().fecha,
          usuario: element.val().usuario
      }
      arrayListComentarios.push(user);

      if (user.uderId == idUser.uid && encon == 0) {
        var f = new Date(user.fecha)
        document.querySelector(".texto-fecha").textContent =  f.getDate()+"/"+(f.getUTCMonth()+1)+"/"+f.getFullYear()  +"    "+ f.getHours()+":"+f.getMinutes();
        encon ++;
      }else{
        if (encon == 0) {
          document.querySelector(".texto-fecha").textContent ="";
        }
      }
  });
  arrayListComentarios.sort((a,b)=>{
      return b.fecha - a.fecha;
  });
}

function cargarComentarios(cantidad){

    for (let index = comentariosCargados ; index < arrayListComentarios.length && index < (comentariosCargados + cantidad); index++) {
      var element = arrayListComentarios[index];
      var f = new Date(element.fecha);
      if (element.comentario.length > 0 ) {
        var datos = {
          usuario: element.usuario,
          calificacion:element.calificacion,
          comentario: element.comentario,
          fecha: f.getDate()+"/"+(f.getUTCMonth()+1)+"/"+f.getFullYear()  +"    "+ f.getHours()+":"+f.getMinutes()
  
        }
        cargarUnComentarioHTML(datos);
      }else{
        cantidad++;
      }
    }
    comentariosCargados= comentariosCargados + cantidad;
    if(comentariosCargados < arrayListComentarios.length){
       document.querySelector(".boton-cargar-mas-comentarios").classList.remove("ocultar")
    }else{
      document.querySelector(".boton-cargar-mas-comentarios").classList.add("ocultar")
    }

}

function getDireccion(direccion){
  var dbref = ref(getDatabase()); 
  let exito = 0;
  while (exito == 0) {
      try {
          var res = get(child(dbref,direccion));
          exito = 1;
      } catch (error) {
          exito = 0;
      }
  }
  return res;
}

function eliminarHTMLComentarios(){
  comentariosCargados = 0;
  var seccionComentarios = document.querySelectorAll(".coment");
  seccionComentarios.forEach(element => {
    element.parentNode.removeChild(element);
  });
}

function  cargarUnComentarioHTML(datos){ // los datos debe tner el nombre del usuario,calificacion,fecha,comentario
 if (datos == null) {
   return;
 }
  var seccionComentarios = document.querySelector(".seccion-comentarios");
  var templateComentario = document.querySelector(".comentario").content;
  var fragment = document.createDocumentFragment();
  
     templateComentario.querySelector(".nombre-usuario-comentario").textContent = datos.usuario;
     templateComentario.querySelector(".fecha-comentario p").textContent = datos.fecha;
     templateComentario.querySelector(".contenido-comentario").textContent = datos.comentario;
     var estrellasComentario = templateComentario.querySelectorAll(".estrella");
    
     for (let index = 0; index < estrellasComentario.length; index++) {
      if (datos.calificacion > index ) {
          estrellasComentario[index].style.fill = "#68CF79";
        }else{
          estrellasComentario[index].style.fill = "#C4C4C4";
        }
       
     }

     //Poniedo letra a la foto de perfil
     templateComentario.querySelector(".foto-perfil p").textContent = datos.usuario.charAt(0);


  fragment.appendChild (templateComentario.cloneNode(true)); 
  seccionComentarios.appendChild(fragment);

}

function ponerFuncionesBotonesComentar(){
  var btnEnviar = document.querySelector(".boton-enviar");
  var btnCancelar = document.querySelector(".boton-cancelar");
  var btnEditar = document.querySelector(".boton-editar");
  var btnEliminar = document.querySelector(".boton-eliminar");
  var btnAgregarComentario = document.querySelector(".boton-agregar-comentario");
  var btnCargarMasComentarios = document.querySelector(".boton-cargar-mas-comentarios");

  btnEditar.addEventListener('click',e=>{
   editando = 1;
   document.querySelector(".texto-fecha").textContent = "";
   estrellasComentar.classList.remove("bloquear");
   cajaTextoComentar.readOnly = false;
   cajaTextoComentar.classList.remove("ocultar");
   botonesEnviarCancelarComentar.classList.remove("ocultar");
   botonesEditarEliminarComentar.classList.add("ocultar");
   contadorLetras.textContent = cajaTextoComentar.value.length +"/500";
    contadorLetras.classList.remove("ocultar")
    document.querySelector(".boton-enviar").classList.remove("inabilitado");
   
  });

  btnCancelar.addEventListener('click',e=>{
    cajaTextoComentar.value = "";
    desmarcarDesmarcarEstrellas(0);
    editando=0;
    cargarSeccionCalificaCurso();
    contadorLetras.textContent = cajaTextoComentar.value.length +"/500";
    contadorLetras.classList.add("ocultar")

   });

  btnEliminar.addEventListener('click',async (e)=>{
    editando =0 ;
    cajaTextoComentar.value = "";
    // restablse la fecha
    desmarcarDesmarcarEstrellas(0);
    borrarComentario();
    await obtenerComentariosFireBase();
    cargarComentarios(3);
    estrellasComentar.classList.add("ocultar");
    cajaTextoComentar.classList.add("ocultar");
    botonesEnviarCancelarComentar.classList.add("ocultar");
    botonesEditarEliminarComentar.classList.add("ocultar");
    botonDarOpinion.classList.remove("ocultar")
    contadorLetras.textContent = cajaTextoComentar.value.length +"/500";
    contadorLetras.classList.add("ocultar");
  });

  btnEnviar.addEventListener('click',e=>{
    if (calcularPuntajeActual() <= 0  ) {
       return;
    }
    if (cajaTextoComentar.value.trim().length == 0) {
      cajaTextoComentar.classList.add("ocultar");
      
    }

    if (editando == 1) {
      editarComentario(cajaTextoComentar.value.trim(), calcularPuntajeActual());
    }else{
      agregarComentario(cajaTextoComentar.value.trim(), calcularPuntajeActual());
    }

    estrellasComentar.classList.add("bloquear");
    cajaTextoComentar.readOnly = true;
    botonesEnviarCancelarComentar.classList.add("ocultar");
    botonesEditarEliminarComentar.classList.remove("ocultar");
    botonDarOpinion.classList.add("ocultar");
    contadorLetras.textContent = cajaTextoComentar.value.length +"/500";
    contadorLetras.classList.add("ocultar");
  });

  btnAgregarComentario.addEventListener('click',e=>{
    editando = 1;
    estrellasComentar.classList.remove("bloquear");
    estrellasComentar.classList.remove("ocultar");
    cajaTextoComentar.classList.remove("ocultar");
    cajaTextoComentar.readOnly = false;
    botonesEnviarCancelarComentar.classList.remove("ocultar");
    botonesEditarEliminarComentar.classList.add("ocultar");
    botonDarOpinion.classList.add("ocultar")
    contadorLetras.textContent = cajaTextoComentar.value.length +"/500";
    contadorLetras.classList.remove("ocultar")
    document.querySelector(".boton-enviar").classList.add("inabilitado");
    // metood para guardar el comentario en la base dedatos
    //volver a cargar los cometnarios
  });

  btnCargarMasComentarios.addEventListener("click",e=>{
    cargarComentarios(3);
    if (comentariosCargados >=  arrayListComentarios.length) {
      e.target.classList.add("ocultar");
      
    }
  });
  cajaTextoComentar.addEventListener("keyup",e=>{
    contadorLetras.textContent = cajaTextoComentar.value.length +"/500";
  });
  estrellasComentar.addEventListener("click",()=>{
    if (calcularPuntajeActual()>=1) {
      document.querySelector(".boton-enviar").classList.remove("inabilitado");
    }
  });

}
function calcularPuntajeActual(){
  var res = 0;
  (estrellasComentar.querySelectorAll(".estrellas")).forEach(element => {
        if (element.checked == true) {
          res++;
        }
  });
  return res;
}

function cargarSeccionCalificaCurso(){
  var encontrado = 0;
   for (let index = 0; index < arrayListComentarios.length && encontrado == 0; index++) {
     const element = arrayListComentarios[index];
     if (element.uderId == idUser.uid) {
     botonDarOpinion.classList.add("ocultar");
     estrellasComentar.classList.add("bloquear");
     estrellasComentar.classList.remove("ocultar");
     botonesEditarEliminarComentar.classList.remove("ocultar");
     botonesEnviarCancelarComentar.classList.add("ocultar");
     cajaTextoComentar.readOnly = true ;
     desmarcarDesmarcarEstrellas(element.calificacion);
     cajaTextoComentar.value = element.comentario;
     var f = new Date(element.fecha)
     document.querySelector(".texto-fecha").textContent =  f.getDate()+"/"+(f.getUTCMonth()+1)+"/"+f.getFullYear()  +"    "+ f.getHours()+":"+f.getMinutes();
     
     if (cajaTextoComentar.value.length > 0) {
       cajaTextoComentar.classList.remove("ocultar");
     }else{
      cajaTextoComentar.classList.add("ocultar");
     }
     encontrado++;
    }
   }

   if(encontrado == 0){
    botonDarOpinion.classList.remove("ocultar");
    estrellasComentar.classList.add("ocultar");;
    botonesEditarEliminarComentar.classList.add("ocultar");
    botonesEnviarCancelarComentar.classList.add("ocultar");
    cajaTextoComentar.classList.add("ocultar");
    
   }

}

function ponerFuncionalidadMarcarEstrellas(){
    var estrellas = document.querySelectorAll(".estrellas");
    estrellas.forEach(element => {
      element.addEventListener('click',e=>{
        desmarcarDesmarcarEstrellas(e.target.value)
      });
    });
} 

function desmarcarDesmarcarEstrellas(value){
  var estrellas = document.querySelectorAll(".estrellas");
  var estrellasLabel = document.querySelectorAll("label");
  for (let index = 0; index < estrellas.length; index++) {
    var element = estrellas[index];
    if(element.value <= value){
       element.checked = true;
       estrellasLabel[index].classList.add('verde');
    }else{
    element.checked = false;
    estrellasLabel[index].classList.remove('verde');
     }
  }
}

function ponerEstadisticasBarras( lista){/* primero poner dede el pocentaje de 5 estrellas lugo el de 4 2 1  */
  var progresos = document.querySelectorAll('.progreso-barra');
  var textoPorcentaje = document.querySelectorAll('.porcentaje-barra');

  for (let index = 0; index < 5; index++) {
   progresos[index].style.width=lista[index];
   textoPorcentaje[index].textContent=lista[index];
  }
}

function ponerPuntajeEstadistica(puntaje){
  var  promedio= document.querySelector(".texto-puntuacion");
  var estrellas = document.querySelectorAll(".estrella-estadistica");
  var restante = puntaje;
  if(puntaje >= 0 && puntaje <= 5){
    promedio.textContent= ""+puntaje;
    for (let index = 1; index <= 5; index++) {
      if(restante > 0){
        if(restante >= 1){
          ponerClasePuntaje(estrellas[index-1],"puntaje1")
           restante--;
        }else if(restante <= 0.21 && restante > 0 ){
          ponerClasePuntaje(estrellas[index-1],"puntaje2")
           restante--;
        }else if(restante <= 0.5 && restante > 0.21){
          ponerClasePuntaje(estrellas[index-1],"puntaje5")
           restante--;
        }else if(restante < 1 && restante > 0.5){
          ponerClasePuntaje(estrellas[index-1],"puntaje7")
           restante--;
        } 
      }else{
        ponerClasePuntaje(estrellas[index-1],"puntaje0")
        restante--;
      }  
    }

  }else{
    console.log("el puntaje sale de los limites");
  }
  
}

function ponerClasePuntaje(elemento,clase){ //agrahamso y quitamos elementos al class de un elemento html
  elemento.classList.remove("puntaje1");
  elemento.classList.remove("puntaje0");
  elemento.classList.remove("puntaje5");
  elemento.classList.remove("puntaje2");
  elemento.classList.remove("puntaje7");
  elemento.classList.add(clase);
}

async function agregarComentario(comentarioUsr, calificacionUsr){
  await set(ref(getDatabase(), "Comentarios/" + idUser.uid), {
    calificacion: calificacionUsr,
    comentario: comentarioUsr,
    fecha: serverTimestamp(),
    usuario: nombreUsr.trim()
  });
  await obtenerComentariosFireBase();
  eliminarHTMLComentarios();
  cargarComentarios(3);
  calcularEstadisticas();
}

async function borrarComentario(){
 await remove(ref(getDatabase(), "Comentarios/" + idUser.uid));
  await obtenerComentariosFireBase();
  eliminarHTMLComentarios();
  cargarComentarios(3);
  calcularEstadisticas();
}

async function editarComentario(comentarioUsr, calificacionUsr){
  const updates = {};
  updates["Comentarios/" + idUser.uid + "/comentario"] = comentarioUsr;
  updates["Comentarios/" + idUser.uid + "/calificacion"] = calificacionUsr;
  updates["Comentarios/" + idUser.uid + "/fecha"] = serverTimestamp();
  updates["Comentarios/" + idUser.uid + "/usuario"] = nombreUsr.trim()
   
   await update(ref(getDatabase()), updates);
   await obtenerComentariosFireBase();
   eliminarHTMLComentarios();
   cargarComentarios(3);
   calcularEstadisticas();
}


onAuthStateChanged(auth, (user) => {
  if (user) {
    const dbref = ref(getDatabase());
    get(child(dbref, "Usuarios/" + user.uid)).then((snapshot) => {
      //console.log(user);
      idUser=user; 
      if (snapshot.exists()) {
        let text = document.getElementById("prueba");
        text.innerHTML = snapshot.val().nombre+'<i class="fas fa-chevron-down"></i>';
        recuperarNivelesUsuario(snapshot.val().nivelActual);
          nombreUsr= snapshot.val().nombre
        setTimeout( ()=>{
          inicializarSeccionComentarios();
        }, 1000)
      } else {
        console.log("No se encontro el elemento");
      }
    })
      .catch((error) => {
        console.log("unsucessfull, error" + error);
      });
  } else {
    window.location.href = "/index.html";
  }
});


const cont = document.getElementById("logout")



cont.addEventListener('click', (e) => {
  window.location.href = "/index.html";
  signOut(auth);
})

function recuperarNivelesUsuario(nivelActual) {
  const db = getDatabase();
  const commentsRef = ref(db, 'Niveles');
  var contenido = "";
  onChildAdded(commentsRef, (data) => {
    if (data.exists()) {
      //objeto recuperado (se ejecuta n veces hasta que termine de leer todos los niveles)
      const objeto = data.val();
      var img_text;
      var btn_text;
      if (/*objeto.nivel<=nivelActual*/true) {
        img_text = "../assets/img/ulock.png";
        btn_text = "btn btn-success";
      } else {
        img_text = "../assets/img/lock.png";
        btn_text = "btn btn-success disabled ";
      }
      contenido += '<div class="col-lg-3 col-md-6 d-flex align-items-stretch mt-4 mt-lg-4 mt-md-4"><div class="course-item" style="border-style: solid;border-width:3px;border-color:black"><div class="row" style="height:40%"><img src="' + objeto.imagen + '" class="img-fluid" alt="..." style="height:100%" ></div><div class="row course-content" style="height:60%"><div class="d-flex justify-content-between align-items-center mb-3" style="height:40%">';
      contenido += '<h3>' + objeto.titulo + '</h3><div class="testimonial-wrap d-flex justify-content-between align-items-center"><div class="testimonial-item d-flex align-items-center"><img src="';
      contenido += img_text + '"  alt="" style="height:64px;width:64px;"></div></div></div><p>' + objeto.descripcion + '</p><div class="text-center " style="height:20%">' + '<a href="pagina-contenido.html?id=' + objeto.id + '"" class="' + btn_text + '">Seleccionar curso</a>';
      contenido += '</div></div></div></div>';

    } else {
      alert("No se encontro el elemento");
    }
    var a = document.getElementById("a");
    a.innerHTML = contenido;

  });
}