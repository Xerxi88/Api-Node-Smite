import { Router } from "express";
import { GodController } from "../controllers/gods.js";

export const godsRouter = Router();

godsRouter.get("/", GodController.getAll);
godsRouter.post("/", GodController.create);

godsRouter.get("/:id", GodController.getById);
godsRouter.patch("/:id", GodController.update);
godsRouter.delete("/:id", GodController.delete);
