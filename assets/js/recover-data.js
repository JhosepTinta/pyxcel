import {db,ref,get,child,onChildAdded} from "../js/connection-firebase.js";
import {PonerContenido,agregarIntroduccionContenido,ponerTitulo,ponerTituloNivel} from "../js/scrip.js";
export {comprobarNivel,recuperarDatos,recuperarIntroduccion,contarTemas,recuperarTituloNivel}



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


