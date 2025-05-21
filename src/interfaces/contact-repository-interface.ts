import { Contact } from "@prisma/client";

import {
  ContactListInputDTO,
  ContactCreateInputDTO,
  ContactGetInputDTO,
  ContactUpdateInputDTO,
  ContactDeleteInputDTO,
} from "../dtos/contact-dto";

export interface IContactRepository {
  create(input: ContactCreateInputDTO): Promise<Contact>;
  get(input: ContactGetInputDTO): Promise<Contact | null>;
  list(input: ContactListInputDTO): Promise<Contact[]>;
  update(input: ContactUpdateInputDTO): Promise<Contact>;
  delete(input: ContactDeleteInputDTO): Promise<Contact>;
} 