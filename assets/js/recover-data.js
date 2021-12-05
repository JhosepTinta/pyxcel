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
    if (res.exists()) {
        return (res.val()).titulo
    } else {
       return "";
    }
}

async function getNombresTemasNivel(codNivel){
    var  aux = await getDireccion("Temas/"+codNivel);
    let res = [];
    if (aux.exists()) {
        aux.forEach(element => {
            res.push(element)
        });
        return res;
    } else {
       return res;
    }
}

async function getContenidoTema(codNivel,codTema){
    var  listaTemas = await getDireccion("Temas/"+codNivel+"/"+codTema + "/Contenidos");
    var listaContendios = [];
    var res = "";
    if (listaTemas.exists()) {
        listaTemas.forEach(element => {
            listaContendios.push(element.val());
        });
        listaContendios.forEach(element => {
        res = res + "<h2>"+element.titulo+"</h2><p>"+element.descripcion+"</p><img src="+element.imagen+"><img>";
        });
        return res;
        
    }else{
        return res;
    }
}

export{getTituloNivel,getNombresTemasNivel,getContenidoTema}