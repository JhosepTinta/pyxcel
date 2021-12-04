import{db,getDatabase,ref,get,set,child,onChildAdded,update,remove} from "../js/connection-firebase.js";

function getDireccion(direccion){
    var dbref = ref(db);
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

async function getTituloNivel(codNivel){
    var  res = await getDireccion("Niveles/"+codNivel);
    return   (res.val()).titulo
}

async function getNombresTemasNivel(codNivel){
    var  aux = await getDireccion("Temas/"+codNivel);
    let res = [];
    aux.forEach(element => {
        res.push(element)
      
    });
    return   res
}

async function getContenidoTema(codNivel,codTema){
    var  listaTemas = await getDireccion("Temas/"+codNivel+"/"+codTema);
    var contenidos = null;
    var listaContendios = [] ;
    var contador = 1;
    var res = '';
    listaTemas.forEach(element => {
       if(contador == 1){
          
          contenidos = element;
       }
           contador++;
    });


    contenidos.forEach(element => {
        listaContendios.push(element.val());
    });
     
    listaContendios.forEach(element => {
       res = res + "<h2>"+element.titulo+"</h2><p>"+element.descripcion+"</p><img src="+element.imagen+"><img>";
    });

    return res;
}


export{getTituloNivel,getNombresTemasNivel,getContenidoTema}