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

import { getDatabase, ref, get, set, child,onChildAdded, update, remove } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-database.js";
        
const db = getDatabase();
export {db,getDatabase,ref,get,set,child,onChildAdded,update,remove};

