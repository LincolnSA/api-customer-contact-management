import { ICustomerRepository } from "../interfaces/customer-repository-interface";
import { ICustomerUpdateUseCase } from "../interfaces/customer-use-case-interface";
import { CustomerUpdateInputDTO } from "../dtos/customer-dto";
import {
  CustomerNotFoundError,
  CustomerExistingEmailError,
  CustomerExistingCpfError
} from "../errors/customer-error";

export class CustomerUpdateUseCase implements ICustomerUpdateUseCase {

  constructor(private customerRepository: ICustomerRepository) { }

  public async execute(input: CustomerUpdateInputDTO) {
    const {
      id,
      name,
      email,
      cpf,
      phone,
      address
    } = input;

    const customer = await this.customerRepository.get({ id });

    if (!customer) {
      throw new CustomerNotFoundError();
    }

    if (email && email !== customer.email) {
      const emailExists = await this.customerRepository.findByEmail({ email });

      if (emailExists && emailExists.id !== id) {
        throw new CustomerExistingEmailError();
      }
    }

    if (cpf && cpf !== customer.cpf) {
      const cpfExists = await this.customerRepository.findByCpf({ cpf });

      if (cpfExists && cpfExists.id !== id) {
        throw new CustomerExistingCpfError();
      }
    }

    return await this.customerRepository.update({
      id,
      name,
      email,
      cpf,
      phone,
      address
    });
  }
}