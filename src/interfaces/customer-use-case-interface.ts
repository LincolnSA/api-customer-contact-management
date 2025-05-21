import { Customer } from "@prisma/client";

import {
  CustomerCreateInputDTO,
  CustomerGetInputDTO,
  CustomerUpdateInputDTO,
  CustomerDeleteInputDTO
} from "../dtos/customer-dto";

export interface ICustomerCreateUseCase {
  execute(input: CustomerCreateInputDTO): Promise<Customer>;
}

export interface ICustomerGetUseCase {
  execute(input: CustomerGetInputDTO): Promise<Customer | null>;
}

export interface ICustomerListUseCase {
  execute(): Promise<Customer[]>;
}

export interface ICustomerUpdateUseCase {
  execute(input: CustomerUpdateInputDTO): Promise<Customer>;
}

export interface ICustomerDeleteUseCase {
  execute(input: CustomerDeleteInputDTO): Promise<Customer>;
} 