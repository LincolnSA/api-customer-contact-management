import { z } from "zod";

export const authLoginSchema = z.object({
  email: z
    .string({ required_error: "obrigatório" })
    .trim()
    .nonempty({ message: "não pode ser vazio" })
    .email({ message: "inválido" })
    .transform((value) => value.toLowerCase()),
});
