//Cambiar el color de los input si estan vacios o no
export function EstiloInput(input) {
    if (input.value === "") {
      input.classList.remove("ring-2");
      input.classList.remove("ring-green-400");
  
      input.classList.add("ring-2");
      input.classList.add("ring-red-400");
      input.focus();
    } else {
      input.classList.remove("ring-2");
      input.classList.remove("ring-red-400");
  
      input.classList.add("ring-2");
      input.classList.add("ring-green-400");
    }
  }