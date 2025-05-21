import { z } from "zod";

export const customerCreateSchema = z.object({
  name: z
    .string({ required_error: "obrigatório" })
    .trim()
    .nonempty({ message: "não pode ser vazio" }),
  email: z
    .string({ required_error: "obrigatório" })
    .trim()
    .nonempty({ message: "não pode ser vazio" })
    .email({ message: "inválido" })
    .transform((value) => value.toLowerCase()),
  cpf: z
    .string({ required_error: "obrigatório" })
    .trim()
    .nonempty({ message: "não pode ser vazio" })
    .transform((value) => value.replace(/[\D]/g, ''))
    .refine((value) => value.length === 11, { message: "deve conter 11 dígitos numéricos" }),
  phone: z
    .string({ required_error: "obrigatório" })
    .trim()
    .nonempty({ message: "não pode ser vazio" })
    .transform((value) => value.replace(/[\D]/g, ''))
    .refine((value) => value.length === 11, { message: "deve conter 11 dígitos numéricos" }),
  address: z
    .string({ required_error: "obrigatório" })
    .trim()
    .nonempty({ message: "não pode ser vazio" }),
});

export const customerUpdateSchema = z.object({
  name: z
    .string({ required_error: "obrigatório" })
    .trim()
    .nonempty({ message: "não pode ser vazio" })
    .optional(),
  email: z
    .string({ required_error: "obrigatório" })
    .trim()
    .nonempty({ message: "não pode ser vazio" })
    .email({ message: "inválido" })
    .transform((value) => value.toLowerCase())
    .optional(),
  cpf: z
    .string({ required_error: "obrigatório" })
    .trim()
    .nonempty({ message: "não pode ser vazio" })
    .transform((value) => value.replace(/[\D]/g, ''))
    .refine((value) => value.length === 11, { message: "deve conter 11 dígitos numéricos" })
    .optional(),
  phone: z
    .string({ required_error: "obrigatório" })
    .trim()
    .nonempty({ message: "não pode ser vazio" })
    .transform((value) => value.replace(/[\D]/g, ''))
    .refine((value) => value.length === 11, { message: "deve conter 11 dígitos numéricos" })
    .optional(),
  address: z
    .string({ required_error: "obrigatório" })
    .trim()
    .nonempty({ message: "não pode ser vazio" })
    .optional(),
});