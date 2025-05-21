import { Customer } from "@prisma/client";

import {
  CustomerCreateInputDTO,
  CustomerGetInputDTO,
  CustomerUpdateInputDTO,
  CustomerDeleteInputDTO
} from "../dtos/customer-dto";

export interface ICustomerRepository {
  create(input: CustomerCreateInputDTO): Promise<Customer>;
  get(input: CustomerGetInputDTO): Promise<Customer | null>;
  list(): Promise<Customer[]>;
  update(input: CustomerUpdateInputDTO): Promise<Customer>;
  delete(input: CustomerDeleteInputDTO): Promise<Customer>;
  findByEmail(input: Pick<CustomerCreateInputDTO, "email">): Promise<Customer | null>;
  findByCpf(input: Pick<CustomerCreateInputDTO, "cpf">): Promise<Customer | null>;
} 