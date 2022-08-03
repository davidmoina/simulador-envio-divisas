//llamamos lo elementos para el modo claro-oscuro
const botonDarkMode = document.getElementById("botonDarkMode");
const botonLightMode = document.getElementById("botonLightMode");
let darkMode
//consultamos si existe o no el local storage del tema
if(localStorage.getItem("theme")) {
  darkMode = localStorage.getItem("theme");
} else {
  localStorage.setItem("theme", "light");
};

if(darkMode == "dark") {
  document.body.classList.add("darkMode");
};

//cada vez que demos click a un boton del tema, este cambiara en el dom y tambien se cambiara los datos en el localstorage para ser recordado
botonDarkMode.addEventListener("click", () => {
  document.body.classList.add("darkMode");
  localStorage.setItem("theme", "dark");
});

botonLightMode.addEventListener("click", () => {
  document.body.classList.remove("darkMode");
  localStorage.setItem("theme", "light");
});

// funciones flecha para hacer operaciones
const total = (num1, num2) => num1 - num2;
const conversion = (num1, num2) => num1 * num2;



//clase para hacer los arrays de movimientos
class Envios {
  constructor(remitente, destinatario, origen, destino, cantidad, comision, cambio) {
    this.remitente = remitente;
    this.destinatario = destinatario;
    this.origen = origen;
    this.destino = destino;
    this.cantidad = cantidad;
    this.comision = comision;
    this.cambio = cambio;
  }
}

const euroPeso = 134.66;
const euroDolar = 1.05;
const pesoEuro = 0.007;
const pesoDolar = 0.008;
const dolarEuro = 0.98;
const dolarPeso = 132.40;
const comision = 0.05;

let nombre, nombreDestinatario, impuesto, divisa, continuar, dineroFinal, impuestoDescontar;

//funcion para seleccionar el tipo de divisa segun el pais
function divisaFuncion (country) {

  if(country === "España") {
    divisa = "euros"
  } else if(country === "Argentina") {
    divisa = "pesos argentinos"
  } else if(country === "Estados Unidos") {
    divisa = "dolares"
  };
};

//aqui segun seleccione el pais en el input de debajo se cambiara el texto entre pesos o euros segun interactue el usuario
let paisOrigen = document.getElementById("idPaisOrigen");
let textoDinero = document.getElementById("textoDinero");

paisOrigen.addEventListener("change", () => {
  //llamamos la funcion anterior para seleccionar la divisa
  divisaFuncion(paisOrigen.value);
  textoDinero.innerHTML = `
    Ingrese la cantidad en ${divisa} a enviar:
  `
});

let paisDestino = document.getElementById("idPaisDestino");

let dinero = document.getElementById("idDinero");
let divComision = document.getElementById("divComision");


//agregamos el texto debajo de la cantidad de dinero segun el pais y moneda
dinero.addEventListener("input", () => {

  divisaFuncion(paisOrigen.value);
  console.log(divisa);

  //llamamos la funcion flecha para descontar el impuesto
  impuestoDescontar = parseFloat(conversion(dinero.value, comision).toFixed(2));

  let dineroTotal = total(dinero.value, impuestoDescontar);

  if(paisOrigen.value == paisDestino.value) {
    dineroFinal = conversion(dineroTotal, 1);
  }
    
  if(paisOrigen.value == "España" && paisDestino.value == "Argentina") {
    dineroFinal = conversion(dineroTotal, euroPeso);
  }
  
  if(paisOrigen.value == "España" && paisDestino.value == "Estados Unidos") {
    dineroFinal = conversion(dineroTotal, euroDolar);
  }

  if(paisOrigen.value == "Argentina" && paisDestino.value == "España") {
    dineroFinal = conversion(dineroTotal, pesoEuro);
  }

  if(paisOrigen.value == "Argentina" && paisDestino.value == "Estados Unidos") {
    dineroFinal = conversion(dineroTotal, pesoDolar);
  }

  if(paisOrigen.value == "Estados Unidos" && paisDestino.value == "España") {
    dineroFinal = conversion(dineroTotal, dolarEuro);
  }

  if(paisOrigen.value == "Estados Unidos" && paisDestino.value == "Argentina") {
    dineroFinal = conversion(dineroTotal, dolarPeso);
  }
  
  divComision.innerHTML = `
      <p>La conversion de divisa le costara ${impuestoDescontar} ${divisa}</p>
    `
});

//creo un array vacio para llenarlo de objetos segun ingrese el usuario
let movimientos = [];

//creamos o llamamos el local storage para ver si existe o no
if(localStorage.getItem("movimientoStorage")) {
  movimientos = JSON.parse(localStorage.getItem("movimientoStorage"));
} else {
  localStorage.setItem("movimientoStorage", JSON.stringify(movimientos))
}

//aqui consultamos los datos del formulario y mandamos los datos al array y asu vez al local storage con los datos introducidos por el usuario
const form = document.getElementById("idForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  nombre = document.getElementById("idNombre").value;
  nombreDestinatario = document.getElementById("idDestinatario").value;
  
  const movimiento = new Envios(nombre, nombreDestinatario,paisOrigen.value, paisDestino.value, dinero.value, impuestoDescontar, dineroFinal);
  movimientos.push(movimiento);

  localStorage.setItem("movimientoStorage", JSON.stringify(movimientos));

  divComision.innerHTML = "";

  Toastify({
    text: "Dinero enviado correctamente",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function(){} // Callback after click
  }).showToast();

  form.reset();
});

//consulto el boton para mostrar los movimientos generados
const botonMostrar = document.getElementById("botonMostrar");

//cada vez que le demos al boton mostrar, este consultara el localstorage y a continuacion mostrara los movimientos en el DOM
botonMostrar.addEventListener("click", () => {
  
  let arrayStorage = JSON.parse(localStorage.getItem("movimientoStorage"));
  const giros = document.getElementById("enviosGenerados");

  giros.innerHTML = "";
  
  arrayStorage.forEach((giro, index) => {
    
    giros.innerHTML += `
      <div class="movimientoGenerado" id="movimiento${index}">
        <h3>Movimiento ${index}</h3>
        <p>Nombre: ${giro.remitente}</p>
        <p>Destinatario: ${giro.destinatario}</p>
        <p>Pais Origen: ${giro.origen}</p>
        <p>Pais Destino: ${giro.destino}</p>
        <p>Dinero Enviado: ${giro.cantidad}</p>
        <p>Comision: ${giro.comision}</p>
        <p>Dinero Ingresado: ${giro.cambio}</p>
        <button class="botonEliminar">Eliminar Registro</button>
      </div>
    `;

  });

  //consultamos y le doy funcionalidad al boton para eliminar cierto movimiento tanto del array, dom y localstorage y muestro el movimiento eliminado en storage
  arrayStorage.forEach((giro, index) => {

    let botonCard = document.getElementById(`movimiento${index}`).lastElementChild;
    botonCard.addEventListener("click", () => {
      document.getElementById(`movimiento${index}`).remove();
      movimientos.splice(giro, 1);
      localStorage.setItem("movimientoStorage", JSON.stringify(movimientos));
      console.log(`Movimiento de ${giro.remitente} eliminado correctamente.`);

    });
  });

});

console.log(movimientos);


