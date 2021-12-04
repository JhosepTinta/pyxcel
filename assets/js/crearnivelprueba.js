import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
const firebaseConfig = {
    apiKey: "AIzaSyAd6JDsbBWEBv_UFCpgNi9zKEjqgiGytTE",
    authDomain: "pyxcel-d6df9.firebaseapp.com",
    projectId: "pyxcel-d6df9",
    storageBucket: "pyxcel-d6df9.appspot.com",
    messagingSenderId: "953396754317",
    appId: "1:953396754317:web:321620a07c7577f5eb6fc4",
    measurementId: "G-46CQF62KX4"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { push, getDatabase, ref, get, set, child, update, remove, onChildAdded, onChildChanged, onChildRemoved } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-database.js";

const db = getDatabase();
const commentsRef = ref(db, 'NivelCont');
var contenido = "";

/*
insertarDatos("hola nivel")

function insertarDatos(tituloNivel) {
    set(ref( commentsRef+"nivel5", {
        NameOfStd: "nivel",
        ABC:"fdsafd"
    }))
        .then(() => {
            alert("Datos registrados correctamente");
        })
        .catch((error) => {
            alert("unsucessfull, error" + error);
        });
}
*/


let idNivel = document.getElementById("idNivel");
let nombreNivel = document.getElementById("nombreNivel");
let botonE = document.getElementById("eliminar");
let botonS = document.getElementById("subir");
botonS.addEventListener("click", function () {
    console.log(nombreNivel);
    console.log(nombreNivel.value);
    subir(nombreNivel.value);
});

botonE.addEventListener("click", function () {
    eliminar(idNivel.value);
});




async function subir(tituloNivel) {
    const newPostKey = await push(child(ref(getDatabase()), 'NivelCont')).key;
    console.log(newPostKey)
    set(
        child(
            ref(getDatabase()),
            "NivelCont/" + newPostKey
        ), {
        id: newPostKey,
        descripcion: "dfasdf",
        imagen: "https://i1.wp.com/hipertextual.com/wp-content/uploads/2017/08/accountant-microsoft-excel-counting.png?fit=1280%2C977&ssl=1",
        titulo: tituloNivel
    }
    )

}

function eliminar(idNivel) {
    remove(ref(getDatabase(), "NivelCont/" + idNivel));
}

