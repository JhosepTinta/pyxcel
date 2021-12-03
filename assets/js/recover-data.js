import {db,ref,get,child,onChildAdded,getDatabase,update,remove} from "../js/connection-firebase.js";
import {PonerContenido,agregarIntroduccionContenido,ponerTitulo,ponerTituloNivel} from "../js/scrip.js";
export {comprobarNivel,recuperarDatos,recuperarIntroduccion,contarTemas,recuperarTituloNivel}
export {recuperarNivel,recuperarTemas,recuperarContenido,recuperarContenidoEspecifico,recuperarDatosTema}
export {eliminarContenidoEspecifico}
export {insertarContenidoEspecifico}
// export {actualizarContenidoEspecifico}
export {actualizarContenidoEspecifico,actualizarDatosTema}
export {contarNiveles}
export {addNivelInTheme}
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


async function comprobarNivel(codNivel){
    var  aux = await getDireccion("Niveles/nivel"+codNivel);
    return aux;
}

function recuperarDatos(ruta,elemento,numeroTema){
    const dbref = ref(db);
    get(child(dbref,ruta+"/"+elemento+numeroTema)).then((snapshot)=>{
        console.log(ruta+"/"+elemento+numeroTema);
        if(snapshot.exists()){
            const obj = snapshot.val().Contenidos; 
            for(const elemento in obj){
                console.log(obj);
                PonerContenido(obj[elemento].titulo,obj[elemento].descripcion,obj[elemento].imagen);
            }
        }else{
            console.log("No se encontro el elemento");
        }
    })
    .catch((error) => {
            console.log("unsucessfull, error" + error);
        });
}

function recuperarIntroduccion(ruta,numeroTema){
    const dbref = ref(db);
    get(child(dbref,ruta+numeroTema)).then((snapshot)=>{
        if(snapshot.exists()){
            console.log(snapshot.val().datos);
            const introducion = snapshot.val().datos;
            agregarIntroduccionContenido(introducion.titulo);
        }else{
            console.log("No se encontro el elemento");
        }
    })
    .catch((error) => {
            console.log("unsucessfull, error" + error);
    });
}


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

function recuperarNivel(nroNivel){
    const dbref = ref(db)
    return get(child(dbref,'Niveles/nivel'+nroNivel))
}

function recuperarTemas(nroNivel){
    const dbref = ref(db)
    return get(child(dbref,'Temas/nivel'+nroNivel))
}

function recuperarDatosTema(nroNivel,nroTema){
    const dbref = ref(db)
    return get(child(dbref,`Temas/nivel${nroNivel}/tema${nroTema}/datos`))
}

function recuperarContenido(nroNivel,nroTema){
    const dbref = ref(db)
    return get(child(dbref,`Temas/nivel${nroNivel}/tema${nroTema}/Contenidos`))
}

function eliminarContenidoEspecifico(nroNivel,nroTema,nroContenido){
    return remove(ref(db,`Temas/nivel${nroNivel}/tema${nroTema}/Contenidos/Cont-${nroContenido}`))      
}

function insertarContenidoEspecifico(nroNivel,nroTema,nroContenido,Contenido) {
    return set(ref(db,`Temas/nivel${nroNivel}/tema${nroTema}/Contenidos/Cont-${nroContenido}`), Contenido)
}

function actualizarContenidoEspecifico(nroNivel,nroTema,nroContenido,Contenido){
    return update(ref(db, `Temas/nivel${nroNivel}/tema${nroTema}/Contenidos/Cont-${nroContenido}`), Contenido)        
}

function actualizarDatosTema(nroNivel,nroTema,Datos){
    return update(ref(db, `Temas/nivel${nroNivel}/tema${nroTema}/datos`), Datos)        
}

function addNivelInTheme(nroNivel){
    return update(ref(db, `Temas/nivel${nroNivel}/tema2`), {
        titulo: "sddsd",
        imagen: "dsfsd"
    });
    // }).then(()=>{
    //     alert("fabricio apesta")
    // }).catch((error)=>{
    //     alert("fabricio no apesta")
    // })  
}

function recuperarContenidoEspecifico(nroNivel,nroTema,nroContenido){
    const dbref = ref(db)
    return get(child(dbref,`Temas/nivel${nroNivel}/tema${nroTema}/Contenidos/Cont-${nroContenido}`))
}





