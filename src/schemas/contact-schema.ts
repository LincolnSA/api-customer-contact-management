import { z } from "zod";

export const contactCreateSchema = z.object({
  name: z
    .string({ required_error: "obrigatório" })
    .trim()
    .nonempty({ message: "não pode ser vazio" }),
  phone: z
    .string({ required_error: "obrigatório" })
    .trim()
    .nonempty({ message: "não pode ser vazio" })
    .transform((value) => value.replace(/[\D]/g, ''))
    .refine((value) => value.length === 11, { message: "deve conter 11 dígitos numéricos" }),
});

export const contactUpdateSchema = z.object({
  name: z
    .string({ required_error: "obrigatório" })
    .trim()
    .nonempty({ message: "não pode ser vazio" })
    .optional(),
  phone: z
    .string({ required_error: "obrigatório" })
    .trim()
    .nonempty({ message: "não pode ser vazio" })
    .transform((value) => value.replace(/[\D]/g, ''))
    .refine((value) => value.length === 11, { message: "deve conter 11 dígitos numéricos" })
    .optional(),
});