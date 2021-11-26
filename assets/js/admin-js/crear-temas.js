
class TarjetaTema{
    constructor(numerotema,titulotema){
        this.numerotema=numerotema;
        this.titulotema=titulotema;
    }
}
class MostrarUI{
    addTema(tarjetatema){
        const listatemas = document.getElementById("lista-de-temas");
        const element = document.createElement("div");
        element.innerHTML = `
                <div class="div-tarjeta">
                    <div class="tarjeta">
                     
                       <div class="numerotema"><p>${tarjetatema.numerotema}</p></div>
                        <div class="titulotema"><p>${tarjetatema.titulotema}</p></div>
                       <div class="botones">
                         <button class="btn">Editar </button>
                         <button class="btn">Eliminar </button>
                        </div>
                    </div>
                </div>
            `;
        listatemas.appendChild(element);
    }
    addUltimo(){
        const listatemas = document.getElementById("lista-de-temas");
        const element = document.createElement("div");
        element.innerHTML = `   <div class="div-tarjeta">
        <div class="tarjeta">
           
         <button class="btn-especial"> <img src="../../assets/img/icons/boton-agregar.png" alt="" width="100px"></button>
           
            </div>
        </div>
    </div>`
              
        listatemas.appendChild(element);
     
    }
}
// Evento que sucedera 
document.getElementById('product-form').addEventListener('submit',function(e){
    
    const titulo = document.getElementById('tema').value;
    const numerotema= document.getElementById('name').value;
    const tarjetatema= new TarjetaTema(titulo,numerotema);

    const contenedor = new MostrarUI();

    contenedor.addTema(tarjetatema);
    // contenedor.addUltimo()
    e.preventDefault();
});
