document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("btnGenerar")
    .addEventListener("click", generarMatrices);
  document.getElementById("btnEnviar").addEventListener("click", enviarDatos);
});

function generarMatrices() {
  const filas = parseInt(document.getElementById("filas1").value);
  const columnas = parseInt(document.getElementById("columnas1").value);

  if (!filas || !columnas || filas <= 0 || columnas <= 0) {
    alert("Las dimensiones deben ser mayores a 0");
    return;
  }

  const contenedor = document.getElementById("matrices");
  contenedor.innerHTML = "";

  // Crear inputs para Matriz 1
  const m1Title = document.createElement("h4");
  m1Title.textContent = "Matriz 1";
  contenedor.appendChild(m1Title);

  const m1Div = document.createElement("div");
  m1Div.className = "matriz";
  m1Div.style.display = "grid";
  m1Div.style.gridTemplateColumns = `repeat(${columnas}, 50px)`;
  m1Div.style.gap = "5px";

  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      const input = document.createElement("input");
      input.type = "number";
      input.id = `m1-${i}-${j}`;
      input.required = true;
      m1Div.appendChild(input);
    }
  }
  contenedor.appendChild(m1Div);

  // Crear inputs para Matriz 2
  const m2Title = document.createElement("h4");
  m2Title.textContent = "Matriz 2";
  contenedor.appendChild(m2Title);

  const m2Div = document.createElement("div");
  m2Div.className = "matriz";
  m2Div.style.display = "grid";
  m2Div.style.gridTemplateColumns = `repeat(${columnas}, 50px)`;
  m2Div.style.gap = "5px";

  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      const input = document.createElement("input");
      input.type = "number";
      input.id = `m2-${i}-${j}`;
      input.required = true;
      m2Div.appendChild(input);
    }
  }
  contenedor.appendChild(m2Div);
}

function enviarDatos() {
  const filas = parseInt(document.getElementById("filas1").value);
  const columnas = parseInt(document.getElementById("columnas1").value);

  const matriz1 = [];
  const matriz2 = [];

  for (let i = 0; i < filas; i++) {
    const fila1 = [];
    const fila2 = [];
    for (let j = 0; j < columnas; j++) {
      const val1 = document.getElementById(`m1-${i}-${j}`).value;
      const val2 = document.getElementById(`m2-${i}-${j}`).value;

      if (val1 === "" || val2 === "") {
        alert("Por favor completá todos los campos de ambas matrices.");
        return;
      }

      fila1.push(Number(val1));
      fila2.push(Number(val2));
    }
    matriz1.push(fila1);
    matriz2.push(fila2);
  }

  // Mostrar lo que se está enviando por consola
  console.log("Enviando matrices:", { matriz1, matriz2 });

  fetch("http://localhost:3000/cargarMatrices", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ matriz1, matriz2 }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Error al cargar matrices");
      return res.json();
    })
    .then((data) => {
      console.log("Respuesta del servidor:", data);
      obtenerResultado();
    })
    .catch((err) => {
      document.getElementById(
        "resultado"
      ).innerHTML = `<p style="color:red;">${err.message}</p>`;
    });
}

function obtenerResultado() {
  fetch("http://localhost:3000/resultado")
    .then((res) => {
      if (!res.ok) throw new Error("Error al obtener el resultado");
      return res.json();
    })
    .then((data) => {
      const resultado = data.resultado;
      let html = "<table>";
      resultado.forEach((fila) => {
        html +=
          "<tr>" + fila.map((val) => `<td>${val}</td>`).join("") + "</tr>";
      });
      html += "</table>";
      document.getElementById("resultado").innerHTML = html;
    })
    .catch((err) => {
      document.getElementById(
        "resultado"
      ).innerHTML = `<p style="color:red;">${err.message}</p>`;
    });
}
