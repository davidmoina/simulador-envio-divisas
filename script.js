const total = (num1, num2) => num1 - num2;
const conversion = (num1, num2) => num1 * num2;


let nombre, nombreDestinatario, dinero, impuesto, divisa;
const euro = 0.007;
const peso = 129.46;
const comision = 0.05;

alert("Enviamos dinero entre España y Argentina, gracias por usar nuestro servicio. Pulse en Aceptar para continuar.");
nombre = prompt("Ingrese su nombre.");
nombreDestinatario = prompt("Ingrese el nombre del destinatario");


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

  if(isNaN(dinero)) {
    alert("Por favor ingrese numeros validos");
  };

} while(isNaN(dinero))

let impuestoDescontar = conversion(dinero, comision);

do {
  impuesto = prompt(`${nombre}, la conversion de divisa le costara ${impuestoDescontar} ${divisa}, ¿desea continuar? Si o No.`).toLowerCase();
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
const movimiento1 = new Envios(nombre, nombreDestinatario, pais, dinero, impuestoDescontar, dineroFinal);
movimientos.push(movimiento1);

console.log(movimientos);

for (const datos of movimientos) {
  console.log(datos);
};
