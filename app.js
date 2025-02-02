const express = require("express");
const gods = require("./gods.json");
const cors = require("cors");
const { validateGods, validatePartialGods } = require("./schema/gods");

const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(cors());

const port = process.env.port ?? 8080;

app.get("/", (req, res) => {
  res.send("<h1>Bienvenido a la galería de dioses</h1>");
});

app.get("/gods", (req, res) => {
  const { carril } = req.query;
  if (carril) {
    const filteredGods = gods.filter((god) =>
      god.carril.some((c) => c.toLowerCase() === carril.toLocaleLowerCase())
    );
    return res.json(filteredGods);
  }
  res.json(gods);
});

app.get("/gods/:id", (req, res) => {
  const { id } = req.params;
  const godSelected = gods.filter((god) => god.id === id);
  res.json(godSelected);
});

app.post("/gods", (req, res) => {
  const result = validateGods(req.body);

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const godDuplicate = gods.some(
    (god) => god.title.toLowerCase() === result.data.title.toLocaleLowerCase()
  );

  if (godDuplicate) {
    return res.status(400).json({
      message: "Dios duplicado, no se puede añadir el mismo dios dos veces",
    });
  }

  const newGod = {
    id: crypto.randomUUID(),
    ...result.data,
  };

  gods.push(newGod);

  return res.status(201).json(newGod);
});

app.patch("/gods/:id", (req, res) => {
  const result = validatePartialGods(req.body);

  if (!result.success) {
    res.status(404).json({ error: JSON.parse(result.error.message) });
  }

  const { id } = req.params;
  const godsIndex = gods.findIndex((god) => god.id === id); //==> Buscamos el indice para saber que elemento de la array debemos modificar
  if (godsIndex === -1) {
    return res.status(404).json({ message: "Dios no encontrado" });
  } // Si el indice que nos devuelve es -1 quiere decir que no ha encontrado coincidencias

  const updateGod = {
    ...gods[godsIndex],
    ...result.data,
  }; // Obtenemos el dios por su indice en el array y modificamos sus datos (poliformismo)

  gods[godsIndex] = updateGod;

  return res.json(updateGod);
});

app.delete("/gods/:id", (req, res) => {
  const { id } = req.params;
  const godIndex = gods.findIndex((god) => god.id === id);
  if (godIndex === -1) {
    return res.status(404).json({ message: "Dios no encontrado" });
  }

  gods.slice(godIndex, 1);

  return res.json({ message: "Dios eliminado" });
});

app.use((req, res) => res.status(400).send("<h1>Error 404:Not Found</h1>"));

app.listen(port, () => {
  console.log(`Servidor levantado en el puerto http://localhost:${port}`);
});
