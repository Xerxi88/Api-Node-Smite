import { validateGods, validatePartialGods } from "../schema/gods.js";
import { GodModel } from "../models/god.js";

export class GodController {
  static async getAll(req, res) {
    const { carril } = req.query;
    const gods = await GodModel.getAll({ carril });
    res.json(gods);
  }
  static async getById(req, res) {
    const { id } = req.params;
    const god = await GodModel.getById({ id });
    if (god) {
      return res.json(god);
    }
    res.status(404).json({ message: "Dios no encontrado" });
  }
  static async create(req, res) {
    const result = validateGods(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newGod = await GodModel.create({ input: result.data });

    if (newGod.error) {
      return res.status(400).json({ message: "Dios duplicado" });
    }

    return res.status(201).json(newGod);
  }
  static async update(req, res) {
    const result = validatePartialGods(req.body);

    if (!result.success) {
      res.status(404).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    const updateGod = await GodModel.update({ id, input: result.data });

    return res.json(updateGod);
  }
  static async delete(req, res) {
    const { id } = req.params;
    const godsDeleted = await GodModel.delete({ id });
    if (godsDeleted === false) {
      return res.status(404).json({ message: "Dios no encontrado" });
    }
    return res.json({ message: "Dios eliminado" });
  }
}
