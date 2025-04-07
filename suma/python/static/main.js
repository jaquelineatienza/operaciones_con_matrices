const form = document.getElementById("dimensionForm");
const container = document.getElementById("matricesContainer");
const enviarBtn = document.getElementById("enviarBtn");
const resultadoDiv = document.getElementById("resultado");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const filas = parseInt(document.getElementById("filas").value);
  const columnas = parseInt(document.getElementById("columnas").value);
  generarInputs(filas, columnas);
});

function generarInputs(filas, columnas) {
  container.innerHTML = "";

  const matriz1 = document.createElement("div");
  const matriz2 = document.createElement("div");
  matriz1.innerHTML = "<h3>Matriz 1</h3>";
  matriz2.innerHTML = "<h3>Matriz 2</h3>";

  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      matriz1.innerHTML += `<input type="number" name="m1-${i}-${j}" required>`;
      matriz2.innerHTML += `<input type="number" name="m2-${i}-${j}" required>`;
    }
    matriz1.innerHTML += "<br>";
    matriz2.innerHTML += "<br>";
  }

  container.appendChild(matriz1);
  container.appendChild(matriz2);
  enviarBtn.style.display = "inline-block";
}

enviarBtn.addEventListener("click", async () => {
  const filas = parseInt(document.getElementById("filas").value);
  const columnas = parseInt(document.getElementById("columnas").value);

  const matriz1 = [];
  const matriz2 = [];

  for (let i = 0; i < filas; i++) {
    const fila1 = [];
    const fila2 = [];
    for (let j = 0; j < columnas; j++) {
      const val1 = document.querySelector(`[name="m1-${i}-${j}"]`).value;
      const val2 = document.querySelector(`[name="m2-${i}-${j}"]`).value;
      fila1.push(Number(val1));
      fila2.push(Number(val2));
    }
    matriz1.push(fila1);
    matriz2.push(fila2);
  }

  try {
    await fetch("http://localhost:5000/cargarMatrices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ matriz1, matriz2 }),
    });

    const res = await fetch("http://localhost:5000/resultado");
    const data = await res.json();

    mostrarResultado(data.resultado);
  } catch (err) {
    resultadoDiv.innerText = "Error al procesar matrices.";
    console.error(err);
  }
});

function mostrarResultado(matriz) {
  resultadoDiv.innerHTML = "<h3>Resultado de la suma:</h3>";
  matriz.forEach((fila) => {
    resultadoDiv.innerHTML += fila.join(" ") + "<br>";
  });
}
