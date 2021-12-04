import { initializeApp, onLog } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {getAuth,onAuthStateChanged,createUserWithEmailAndPassword , signInWithEmailAndPassword} from  "https:www.gstatic.com/firebasejs/9.4.0/firebase-auth.js"
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
const auth = getAuth(app);
const email = "a";



const form = document.getElementById('form')

    
    async   function creandoCuenta (correo,contra){

            await createUserWithEmailAndPassword(auth,correo,contra) 
        }


        function iniciar(correo,contra){
            
            signInWithEmailAndPassword(auth, correo, contra)
            .then((userCredential) => {
              // Signed in
              onAuthStateChanged(auth, (user) => {
                if (user) {
                  
                  const uid = user.uid;
                  // console.log(uid)
                  // console.log(user)
                } else {
                  // User is signed out
                  // ...
                }
              });
              console.log(userCredential.user.email)
              // console.log(correo)
              // console.log(correo.indexOf("gmail"))
              if (userCredential.user.email.indexOf("pyxcel") != -1) {
                  console.log("si esta")
                  window.location.href = "/pages/seccionNiveles.html"
              } else {
                console.log("no esta")
                // Hay que cambiar la direccion y dara :v
                window.location.href = "/pages/nivel.html"
              }
              
              // ...
            })
            .catch((error) => {
              console.log("No pude Loguearme karen >:,v/");
              document.getElementById("error").classList.remove("e");
              document.getElementById("error").classList.add("error");
              
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


  // const logout = document.querySelector('#logout')
  
  // logout.addEventListener('click', e => {
  //   e.preventDefault();
  //   auth.signOut.then(() => {
  //     console.log("me pude salir karen :D")
  //   })
  // })

evento ();


