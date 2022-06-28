let desafios = prompt("¿Cuantos desafios tiene este curso de Javascript en Coderhouse? Introduce fin para finalizar el bucle si no logras acertarlo.");

while(desafios != 11 && desafios != "fin") {
  alert("Incorrecto, intentalo de nuevo.");

  desafios = prompt("Ingresa otro numero. Introduce fin para finalizar el bucle si no logras acertarlo.");
};