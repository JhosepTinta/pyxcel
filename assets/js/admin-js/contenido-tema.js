import {
    recuperarContenido,
    actualizarContenidoEspecifico,
    recuperarDatosTema,
    actualizarDatosTema
  } from "../recover-data.js";

  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  
  /*await recuperarNivel(1).then((nivel)=>{
  export {recuperarNivel}
  await recuperarNivel(1).then((nivel)=>{
      if(nivel.exists()){
          console.log(nivel.val());
         
      }else{
          console.log("No se encontro el elemento");
      }
  });*/
  /*console.log("holaaaaa")
  await recuperarTemas(1).then((datos)=>{
      if(datos.exists()){
          console.log(datos.val());
      }
  })*/
  var activatedForm = false;
  var newContent = false;
  var numContent = 0;
  var previousElement = "";
  var numNivel = getParameterByName('nivel');
  var nunTema = getParameterByName('tema');;
  
  //ejecucion de funciones iniciales
  await recuperarDatosTema(numNivel, nunTema).then((tema)=>{
      if(tema.exists()){
          let titleTopic = tema.val().titulo;
          document.querySelector(".title-input").setAttribute("value",`${titleTopic}`);
      }
  })
  
  await recuperarContenido(numNivel, nunTema).then((contenidos) => {
    if (contenidos.exists()) {
      let object = contenidos.val();
      let cont = 0;
      for (const key in object) {
        cont++;
        numContent = cont;
        //console.log(object[key]);
        innerComponent(
          cont,
          object[key].titulo,
          object[key].descripcion,
          object[key].imagen
        );
      }
    }
  });
  assignEvents();
  
  //funciones de interaccion
  document.querySelector(".add-content").addEventListener("click", () => {
    allActivateInvisible();
    innerComponentAndForm(numContent);
    addEventComponent(document.getElementById(`content-${numContent}`));
    addEventComponentDelete(document.getElementById(`content-${numContent}`).lastElementChild);
    addEventComponentSave(document.getElementById(`content-${numContent}`).parentNode.lastElementChild.lastElementChild.lastElementChild);
    numContent++;
    newContent = true;
  });
  
  function assignEvents() {
    document.querySelectorAll(".content").forEach((element) => {
      addEventComponent(element);
    });
    document.querySelectorAll(".content-element img").forEach((element) => {
      addEventComponentDelete(element);
    });
    document.querySelectorAll(".img-save-content").forEach((element) => {
      addEventComponentSave(element)
    });
    addEventTitleSave(document.querySelector(".icon-save img"));
  }

  function addEventTitleSave(element){
      element.addEventListener("click",()=>{
        let titleElement = document.querySelector(".title-container input");
        let title = titleElement.value;
        actualizarDatosTema(numNivel,nunTema,{
            titulo: title
        }).then(() => {
            //alert("Contenido registrado correctamente");
            Swal.fire(
                'Guardado con exito!'
            )
        })
        .catch((error) => {
            alert("unsucessfull, error" + error);
        });
      });
  }
  
  function addEventComponentSave(component){
      component.addEventListener("click", (e) => {
          let targetContainerForm = e.target.parentNode.parentNode;
          let idContentForm = targetContainerForm.getAttribute("id");
          let form = document.querySelector(`#${idContentForm} .content-form`)
          let numForm = idContentForm[idContentForm.length-1];
          let title = form.childNodes[1].lastElementChild;
          let description = form.childNodes[3].lastElementChild;
          let img = form.childNodes[5].lastElementChild;
          actualizarContenidoEspecifico(numNivel,nunTema,numForm,{
              descripcion: description.value,
              titulo: title.value,
              imagen: img.value,
          }).then(() => {
              //alert("Contenido registrado correctamente");
              Swal.fire(
                'Guardado con exito!'
              )
          })
          .catch((error) => {
              alert("unsucessfull, error" + error);
          });/**/
      })
  }
  
  function addEventComponentDelete(component){
      ///// aqui poner la alerta cuando se guarda poner newContent en false
        /*eliminarContenidoEspecifico().then(() => {
      alert("Datos eliminados correctamente");
  })
  .catch((error) => {
      alert("unsucessfull, error" + error);
  });*/
    
      component.addEventListener("click", (e) => {
          /*deleteComponent(e.target);
          if(newContent){
              console.log("se elimina un componente nuevo")
              newContent = false;
          }else{
              console.log("se elimina un componente antiguo")
          }*/
          console.log("esta elminando ")
          let idForm = e.target.parentNode.parentNode.lastElementChild.getAttribute("id");
          let numForm = idForm[idForm.length-1]
          console.log(numForm)
          /*Swal.fire({
            title: '¿Esta seguro de elimnar este contenido?',
            text: "Los cambios seran permanentes",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })*/
          /*Swal.fire({
            title: "¿Estas seguro que deseas eliminar este contenido?",
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
                Swal.fire('Confirmar')
            }else if(result.dismiss){
                Swal.fire('Cancelar')
            }
      
        })*/
        console.log(numContent);
        deleteComponent(e.target)
        correctComponentId(numForm);
        console.log(numContent);
      })
  }
  
  function addEventComponent(component) {
    component.addEventListener("click", (e) => {
      let auxCharacter = e.target.textContent;
      let auxNum = parseInt(auxCharacter[auxCharacter.length - 1]);
      if (previousElement === e.target.textContent) {
        console.log("se volvio a entrar");
        if(activatedForm){
          setState(e.target,"desactivado")
          toggleVisibility(e.target);
          activatedForm = false;
        }else{
          setState(e.target,"activado")
          toggleVisibility(e.target);
          activatedForm = true;
        }
      } else if (activatedForm) {
        console.log("hay uno activo");
        allActivateInvisible();
        setState(e.target,"activado")
        toggleVisibility(e.target);
        activatedForm = true;
      } else {
        activatedForm = true;
        setState(e.target,"activado")
        toggleVisibility(e.target)
      }
      previousElement = e.target.textContent;
    });
  }
  
  function setState(element,state){
      element.parentNode.parentNode.setAttribute("state",state)
  }
  
  function toggleVisibility(element){
      element.parentNode.parentNode.lastElementChild.classList.toggle("invisible");
  }
  
  function allActivateInvisible(){
      document.querySelectorAll("[state=activado]").forEach((estado)=>{
          estado.setAttribute("state","desactivado");
          estado.lastElementChild.classList.add("invisible");
      })
  }
  
  //funciones necesarias para pintar
  function innerComponent(numberContent, title, description, img) {
    const contenedorTotal = document.querySelector(".content-container");
    const contenedor = document.createElement("div");
    contenedor.setAttribute("class", "content-element-container");
    contenedor.setAttribute("state", "desactivado");
    contenedor.setAttribute("save", "true");
    numContent++;
    const nuevoContenido = `
          <div id="content-${numberContent}" class="content-element">
              <a href="#content-${numberContent}" class="content">Contenido ${numberContent}</a>
              <img src="../../assets/img/icons/eliminar.png" alt=""> 
          </div>
          <div id="form-${numberContent}" class="content-form-container invisible">
              <div class="content-form">
              <label for="">Titulo
                  <input type="text" value="${title}">
              </label>
              <div>
              <label for="" class="label-area">Descripción
              </label>
              <textarea name="" id="" cols="52" rows="10">${description}</textarea>
              </div>
                 <label for="">Imagen
                 <input id="input-img" type="text" value="${img}">
                 </label>
              </div>
              <div class="icon-save icon-form">
              <img id="img-save-content" class="img-save-content" src="../../assets/img/icons/disco-guardar.png" alt="">
              </div>
          </div>
      `;
    contenedor.innerHTML = nuevoContenido;
    contenedorTotal.appendChild(contenedor);
  }
  
  function deleteComponent(component) {
    component.parentNode.parentNode.parentNode.removeChild(component.parentNode.parentNode);
  }
  
  function innerComponentAndForm(numberContent) {
    const contenedorTotal = document.querySelector(".content-container");
    const contenedor = document.createElement("div");
    contenedor.setAttribute("class", "content-element-container");
    contenedor.setAttribute("state", "activado");
    const nuevoContenido = `
          <div id="content-${numberContent}" class="content-element">
              <a href="#content-${numberContent}" class="content">Contenido ${numberContent}</a>
              <img src="../../assets/img/icons/eliminar.png" alt=""> 
          </div>
          <div id="form-${numberContent}" class="content-form-container">
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
                      <input id="input-img" type="text">
                  </label>
              </div>
              <div class="icon-save icon-form">
                  <img id="img-save-content" class="img-save-content" src="../../assets/img/icons/disco-guardar.png" alt="">
              </div>
          </div>
      `;
    contenedor.innerHTML = nuevoContenido;
    contenedorTotal.appendChild(contenedor);
    activatedForm = true;
    previousElement = `Contenido ${numberContent}`;
  }

  function correctComponentId(idDeleted){
    let formId = 0;
    let contentId = 0;
    let cont = 1;
    let lastId = 0;
    
    document.querySelectorAll(".content-element-container").forEach((element)=>{
      
      //formId = element.firstElementChild.getAttribute("id");
      contentId = element.lastElementChild.getAttribute("id");
      //formId = parseInt(formId[formId.length -1]);
      contentId = parseInt(contentId[contentId.length -1]);
      console.log("el numero de cont es: "+numContent)
      if(contentId >= idDeleted){

        if((contentId-1) == 1){
          cont = 1;
          setContentAndId(element,cont);
          lastId = contentId;
        }else if(contentId === 1){
          lastId = contentId;
          cont = 1;
          setContentAndId(element,cont);
        }else if(lastId === (contentId-1)){
          setContentAndId(element,cont);
        }else{
          setContentAndId(element,cont);
        }
      }else{
        console.log("se ignoro",cont);
      }
        cont ++;
        //numContent--;
    console.log(element.firstElementChild.firstElementChild.textContent)
  })
    numContent = cont;
  }

  function setContentAndId(component, newId){
    component.lastElementChild.setAttribute("id",`form-${newId}`)
    component.firstElementChild.setAttribute("id",`content-${newId}`)
    component.firstElementChild.firstElementChild.textContent = `Contenido ${newId}`;
  }
  