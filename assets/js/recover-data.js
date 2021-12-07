import{db,getDatabase,ref,get,set,child,onChildAdded,update,remove,push} from "../js/connection-firebase.js";

export {contarTemas,recuperarTituloNivel}
export {recuperarContenido,recuperarDatosTema}
export {eliminarContenidoEspecifico}

export {actualizarContenidoEspecifico,actualizarDatosTema}
export {contarNiveles,crearId}
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


async function contarTemas(nivelActual){
        let n = 1;

        var  data = await getDireccion("Temas/nivel"+nivelActual);
        console.log('------------------')
        console.log(data.val())
        let res = [];
        data.forEach(element => {

            ponerTitulo(element.val().datos.titulo,n);
            n++;
            res.push(element.val().datos.titulo)
        });
    return   res
}
async function contarNiveles(){
    let n = 1;

    var  data = await getDireccion("Niveles");
    console.log('------------------')
    console.log(data.val())
    let res = [];
    data.forEach(element => {
        n++;
         res.push(element.val())
    });
return  n;
}
function recuperarTituloNivel(ruta,numeroNivel){
    const dbref = ref(db);
    get(child(dbref,ruta+numeroNivel)).then((snapshot)=>{
        if(snapshot.exists()){
            let titulo = snapshot.val().titulo;
            ponerTituloNivel(`Nivel ${numeroNivel}: ${titulo}`);
        }else{
            console.log("No se encontro el elemento");
        }
    })
    .catch((error) => {
            console.log("unsucessfull, error" + error);
    });
}

function recuperarDatosTema(nroNivel,nroTema){
    const dbref = ref(db)
    return get(child(dbref,`Temas/${nroNivel}/${nroTema}/datos`))
}

function recuperarContenido(nroNivel,nroTema){
    const dbref = ref(db)
    return get(child(dbref,`Temas/${nroNivel}/${nroTema}/Contenidos`))
}

function eliminarContenidoEspecifico(nroNivel,nroTema,nroContenido){
    return remove(ref(db,`Temas/${nroNivel}/${nroTema}/Contenidos/${nroContenido}`))      
}

function actualizarContenidoEspecifico(nroNivel,nroTema,nroContenido,Contenido){
    return update(ref(db, `Temas/${nroNivel}/${nroTema}/Contenidos/${nroContenido}`), Contenido)        
}

function actualizarDatosTema(nroNivel,nroTema,Datos){git 
    return update(ref(db, `Temas/${nroNivel}/${nroTema}/datos`), Datos)               
}

function crearId(nroNivel,nroTema){
    return push(child(ref(getDatabase()), `Temas/${nroNivel}/${nroTema}/Contenidos/`)).key;
}
