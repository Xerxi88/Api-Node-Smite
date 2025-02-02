import z from "zod";

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: "God title must be a string",
    required_error: "God title is required",
  }),
  year: z.number().int().min(2012).max(2025),
  panteon: z.string({
    invalid_type_error: "Panteon debe ser un string",
    required_error: "El campo del panteon es obligatorio",
  }),
  rol: z.string({
    invalid_type_error: "El rol debe ser un string",
    required_error: "El campo del rol es obligatorio",
  }),
  poster: z
    .string({
      invalid_type_error: "El poster debe ser un string",
      required_error: "El campo del rol es obligatorio",
    })
    .url({
      message: "el poster tiene debería de ser una url válida",
    }),
  carril: z.array(z.enum(["Jungla", "Solo", "Medio", "Soporte", "Dúo"])),
  rate: z.number().min(0).max(10),
});

const validateGods = (object) => {
  return movieSchema.safeParse(object);
};

const validatePartialGods = (object) => {
  return movieSchema.partial().safeParse(object);
};

export { validateGods, validatePartialGods };
