const total = (num1, num2) => num1 - num2;
const conversion = (num1, num2) => num1 * num2;

class Envios {
  constructor(remitente, destinatario, destino, cantidad, comision, cambio) {
    this.remitente = remitente;
    this.destinatario = destinatario;
    this.destino = destino;
    this.cantidad = cantidad;
    this.comision = comision;
    this.cambio = cambio;
  }
}

const movimientos = [];

const euro = 0.007;
const peso = 129.46;
const comision = 0.05;

let nombre, nombreDestinatario, dinero, impuesto, divisa, pais, continuar, impuestoDescontar;

const form = document.getElementById("idForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  nombre = document.getElementById("idNombre").value;
  nombreDestinatario = document.getElementById("idDestinatario").value;
  pais = document.getElementById("idPais").value;

  if(pais === "españa") {
    divisa = "pesos argentinos"
  } else if(pais === "argentina") {
    divisa = "euros"
  }

  dinero = parseInt(document.getElementById("idDinero").value);

  console.log(nombre, nombreDestinatario, pais, dinero);

  let impuestoDescontar = conversion(dinero, comision);

  do {
    impuesto = prompt(`${nombre}, la conversion de divisa le costara ${impuestoDescontar} ${divisa}, ¿desea continuar? Si/No.`).toLowerCase();
  } while(impuesto != "si" && impuesto != "no")

  let dineroTotal = total(dinero, impuestoDescontar);
  
  if(impuesto === "si" && pais === "españa") {
    dineroFinal = conversion(dineroTotal, euro);
    alert( `Muchas gracias por usar nuestro servicio, le llegara a ${nombreDestinatario} en España la cantidad de ${dineroFinal} euros.`);
  
  } else if(impuesto === "si" && pais === "argentina") {
    dineroFinal = conversion(dineroTotal, peso);
    alert(`Muchas gracias por usar nuestro servicio, le llegara a ${nombreDestinatario} en Argentina la cantidad de ${dineroFinal} pesos argentinos.`);
  } else {
    dineroFinal = 0;
    alert("Muchas gracias por su tiempo");
  }

  const movimiento = new Envios(nombre, nombreDestinatario, pais, dinero, impuestoDescontar, dineroFinal);
  movimientos.push(movimiento);

  console.log(movimiento);

  const giros = document.getElementById("enviosGenerados");

  giros.innerHTML = "";
  
  movimientos.forEach(giro => {
    
    giros.innerHTML += `
      <div class="movimientoGenerado">
        <h3>Movimiento</h3>
        <p>Nombre: ${giro.remitente}</p>
        <p>Destinatario: ${giro.destinatario}</p>
        <p>Pais Destino: ${giro.destino}</p>
        <p>Dinero Ingresado: ${giro.cambio}</p>
      </div>
    `;
  });

  form.reset();
});
/*
alert("Enviamos dinero entre España y Argentina, gracias por usar nuestro servicio. Pulse en Aceptar para continuar.");

//solicitamos datos al usuario y a la vez los vamos validando
do {
  do {
    nombre = prompt("Ingrese su nombre.");
    nombreDestinatario = prompt("Ingrese el nombre del destinatario");
  
  } while(nombre.length == 0 || nombreDestinatario.length == 0);
  
  do {
    pais = prompt("A que pais desea enviar el dinero. España o Argentina.").toLowerCase();
  
  
  if(pais === "españa") {
    divisa = "pesos argentinos"
  } else if(pais === "argentina") {
    divisa = "euros"
  } else {
    alert("Ingrese un pais valido");
  }
  } while(pais != "españa" && pais != "argentina" )
  
  
  do {
    dinero = parseFloat(prompt(`Ingrese la cantidad en ${divisa} a enviar.`));
  
    if(isNaN(dinero) || dinero <= 0) {
      alert("Por favor ingrese numeros validos");
    };
  
  } while(isNaN(dinero) || dinero <= 0)
  
  let impuestoDescontar = conversion(dinero, comision);
  
  do {
    impuesto = prompt(`${nombre}, la conversion de divisa le costara ${impuestoDescontar} ${divisa}, ¿desea continuar? Si/No.`).toLowerCase();
  } while(impuesto != "si" && impuesto != "no")
  
  let dineroTotal = total(dinero, impuestoDescontar);
  
  if(impuesto === "si" && pais === "españa") {
    dineroFinal = conversion(dineroTotal, euro);
    alert( `Muchas gracias por usar nuestro servicio, le llegara a ${nombreDestinatario} en España la cantidad de ${dineroFinal} euros.`);
  
  } else if(impuesto === "si" && pais === "argentina") {
    dineroFinal = conversion(dineroTotal, peso);
    alert(`Muchas gracias por usar nuestro servicio, le llegara a ${nombreDestinatario} en Argentina la cantidad de ${dineroFinal} pesos argentinos.`);
  } else {
    dineroFinal = 0;
    alert("Muchas gracias por su tiempo");
  }

  const movimiento = new Envios(nombre, nombreDestinatario, pais, dinero, impuestoDescontar, dineroFinal);
  movimientos.push(movimiento);


  do {
    continuar = prompt("¿Desea hacer un nuevo envio? Si/No.").toLowerCase();

  } while(continuar != "si" && continuar != "no")

  
} while(continuar != "no")
*/

console.log(movimientos);

for (const datos of movimientos) {
  console.log(datos);
};

const giros = document.getElementById("enviosGenerados");
  
movimientos.forEach(giro => {
  giros.innerHTML += `
    <div class="movimientoGenerado">
      <h3>Movimiento</h3>
      <p>Nombre: ${giro.remitente}</p>
      <p>Destinatario: ${giro.destinatario}</p>
      <p>Pais Destino: ${giro.destino}</p>
      <p>Dinero Ingresado: ${giro.cambio}</p>
    </div>
  `
});