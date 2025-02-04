import express from "express";
import cors from "cors";
import { godsRouter } from "./routes/gods.js";

const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(cors());

const port = process.env.port ?? 8080;

app.get("/", (req, res) => {
  res.send("<h1>Bienvenido a la galería de dioses</h1>");
});

app.use("/gods", godsRouter);

app.use((req, res) => res.status(400).send("<h1>Error 404:Not Found</h1>"));

app.listen(port, () => {
  console.log(`Servidor levantado en el puerto http://localhost:${port}`);
});
