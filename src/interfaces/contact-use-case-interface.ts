import { Contact } from "@prisma/client";

import {
  ContactCreateInputDTO,
  ContactGetInputDTO,
  ContactDeleteInputDTO,
  ContactUpdateInputDTO,
  ContactListInputDTO
} from "../dtos/contact-dto";

export interface IContactCreateUseCase {
  execute(input: ContactCreateInputDTO): Promise<Contact>;
}

export interface IContactGeUseCase {
  execute(input: ContactGetInputDTO): Promise<Contact>;
}

export interface IContactListUseCase {
  execute(input: ContactListInputDTO): Promise<Contact[]>;
}

export interface IContactUpdateUseCase {
  execute(input: ContactUpdateInputDTO): Promise<Contact>;
}

export interface IContactDeleteUseCase {
  execute(input: ContactDeleteInputDTO): Promise<Contact>;
}