import { recuperarNivel } from "../recover-data.js";

await recuperarNivel(1).then((nivel)=>{
    if(nivel.exists()){
        console.log(nivel.val());
    }else{
        console.log("No se encontro el elemento");
    }
});
