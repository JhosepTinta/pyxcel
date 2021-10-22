import {db,ref,get,child,onChildAdded} from "./connection-firebase.js";
import {PonerContenido,agregarIntroduccionContenido,ponerTitulo,ponerTituloNivel} from "./scrip.js";
export {recuperarDatos,recuperarIntroduccion,contarTemas,recuperarTituloNivel}
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


function contarTemas(){
        let objeto =new Object();
        let n = 1;
        const commentsRef = ref(db, 'Temas/nivel1');
        onChildAdded(commentsRef, (data) => { 
            if (data.exists()) { //objeto recuperado (se ejecuta n veces hasta que termine de leer todos los niveles) 
                objeto = data.val().datos; 
                ponerTitulo(objeto["titulo"],n);
                n++;
            } else { alert("No se encontro el elemento"); } 
        });   
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

