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

let nombre, nombreDestinatario, impuesto, divisa, continuar, dineroFinal, impuestoDescontar;

let pais = document.getElementById("idPais");
let textoDinero = document.getElementById("textoDinero");


pais.addEventListener("change", () => {

  if(pais.value === "españa") {
    divisa = "pesos argentinos"
  } else if(pais.value === "argentina") {
    divisa = "euros"
  }

  textoDinero.innerHTML = `
    Ingrese la cantidad en ${divisa} a enviar:
  `
});

let dinero = document.getElementById("idDinero");
let divComision = document.getElementById("divComision");


//agregamos el texto debajo de la cantidad de dinero
dinero.addEventListener("input", () => {

  if(pais.value === "españa") {
    divisa = "pesos argentinos"
  } else if(pais.value === "argentina") {
    divisa = "euros"
  }

  impuestoDescontar = parseFloat(conversion(dinero.value, comision).toFixed(2));

  let dineroTotal = total(dinero.value, impuestoDescontar);
    
  if(pais.value === "españa") {
    dineroFinal = conversion(dineroTotal, euro);

  } else if(pais.value === "argentina") {
    dineroFinal = conversion(dineroTotal, peso);
  } else {
    dineroFinal = 0;
  }

  divComision.innerHTML = `
      <p>La conversion de divisa le costara ${impuestoDescontar} ${divisa}</p>
    `
})






const form = document.getElementById("idForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  nombre = document.getElementById("idNombre").value;
  nombreDestinatario = document.getElementById("idDestinatario").value;
  
  const movimiento = new Envios(nombre, nombreDestinatario, pais.value, dinero.value, impuestoDescontar, dineroFinal);
  movimientos.push(movimiento);

  console.log(movimiento);

  const giros = document.getElementById("enviosGenerados");

  giros.innerHTML = "";
  divComision.innerHTML = "";
  
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