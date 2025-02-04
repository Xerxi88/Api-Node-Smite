import { randomUUID } from "node:crypto";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const gods = require("../gods.json");

export class GodModel {
  static async getAll({ carril }) {
    if (carril) {
      return gods.filter((god) =>
        god.carril.some((c) => c.toLowerCase() === carril.toLocaleLowerCase())
      );
    }
    return gods;
  }

  static async getById({ id }) {
    const god = gods.find((god) => god.id === id);
    return god;
  }

  static async create({ input }) {
    const duplicatedGod = gods.some(
      (god) => god.title.toLowerCase() === input.title.toLowerCase()
    );

    if (duplicatedGod) {
      return { error: "Dios duplicado" };
    }
    const newGod = {
      id: randomUUID(),
      ...input,
    };

    gods.push(newGod);

    return newGod;
  }

  static async update({ id, input }) {
    const godsIndex = gods.findIndex((god) => god.id === id); //==> Buscamos el indice para saber que elemento de la array debemos modificar
    if (godsIndex === -1) {
      return false;
    } // Si el indice que nos devuelve es -1 quiere decir que no ha encontrado coincidencias

    const updateGod = {
      ...gods[godsIndex],
      ...input,
    }; // Obtenemos el dios por su indice en el array y modificamos sus datos (poliformismo)

    gods[godsIndex] = updateGod;

    return updateGod;
  }

  static async delete({ id }) {
    const godIndex = gods.findIndex((god) => god.id === id);
    if (godIndex === -1) {
      return false;
    }

    gods.splice(godIndex, 1);

    return true;
  }
}
