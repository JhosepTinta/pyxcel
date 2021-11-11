import { initializeApp, onLog } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {getAuth,createUserWithEmailAndPassword , signInWithEmailAndPassword} from  "https:www.gstatic.com/firebasejs/9.4.0/firebase-auth.js"
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
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const form = document.getElementById('form')

    
  async   function creandoCuenta (correo,contra){

            await createUserWithEmailAndPassword(auth,correo,contra) 
        }
        function iniciar(correo,contra){
            
            signInWithEmailAndPassword(auth, correo, contra)
            .then((userCredential) => {
              // Signed in
              console.log("Ya me loguee Karen ")
              
              // ...
            })
            .catch((error) => {
              console.log("No pude Loguearme karen >:,v/")
              // ..
            });
        }

 async   function evento (){

    form.addEventListener('submit', function(event){
        event.preventDefault(); //borrar
    
        const correo = document.getElementById('correo').value;
        const contrasenia = document.getElementById('contrasenia').value;
    
        
        
        console.log(correo);
        console.log(contrasenia);


        // creandoCuenta (correo,contrasenia)  //Si quieres crear descomenta esto
        
        iniciar (correo,contrasenia);  //si quieres inicarSesion descomenta esto

    })
}

evento ();


