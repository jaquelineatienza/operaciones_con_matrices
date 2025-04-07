import express from "express";
import morgan from "morgan";
import cors from "cors";
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(express.static("public"));

let matriz1 = [];
let matriz2 = [];

app.post("/cargarMatrices", (req, res) => {
  matriz1 = req.body.matriz1;
  matriz2 = req.body.matriz2;

  if (!matriz1 || !matriz2) {
    return res.status(400).json({ error: "Faltan matrices" });
  }

  if (
    matriz1.length !== matriz2.length ||
    matriz1[0].length !== matriz2[0].length
  ) {
    return res
      .status(400)
      .json({ error: "Las matrices deben tener las mismas dimensiones" });
  }

  res.json({ mensaje: "Matrices recibidas correctamente" });
});

app.get("/resultado", (req, res) => {
  if (!matriz1.length || !matriz2.length) {
    return res.status(400).json({ error: "No hay matrices cargadas aún" });
  }

  let resultado = [];
  for (let i = 0; i < matriz1.length; i++) {
    resultado[i] = [];
    for (let j = 0; j < matriz1[0].length; j++) {
      resultado[i][j] = matriz1[i][j] + matriz2[i][j];
    }
  }

  res.json({ resultado });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
