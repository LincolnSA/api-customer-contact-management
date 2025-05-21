import { Customer } from "@prisma/client";

export interface CustomerCreateInputDTO {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  address: string;
}

export interface CustomerCreateOutputDTO extends Customer { }

export interface CustomerGetInputDTO {
  id: string;
}

export interface CustomerGetOutputDTO extends Customer { }

export interface CustomerUpdateInputDTO {
  id: string;
  name?: string;
  email?: string;
  cpf?: string;
  phone?: string;
  address?: string;
}

export interface CustomerUpdateOutputDTO extends Customer { }

export interface CustomerDeleteInputDTO {
  id: string;
}

export interface CustomerDeleteOutputDTO extends Customer { }