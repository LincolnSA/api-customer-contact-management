import { ICustomerCreateUseCase } from "../interfaces/customer-use-case-interface";
import { ICustomerRepository } from "../interfaces/customer-repository-interface";
import { CustomerCreateInputDTO } from "../dtos/customer-dto";
import { CustomerExistingEmailError, CustomerExistingCpfError } from "../errors/customer-error";

export class CustomerCreateUseCase implements ICustomerCreateUseCase {

  constructor(private customerRepository: ICustomerRepository) { }

  public async execute(input: CustomerCreateInputDTO) {
    const {
      name,
      cpf,
      email,
      phone,
      address
    } = input;

    const emailExists = await this.customerRepository.findByEmail({ email });

    if (emailExists) {
      throw new CustomerExistingEmailError();
    }

    const cpfExists = await this.customerRepository.findByCpf({ cpf });

    if (cpfExists) {
      throw new CustomerExistingCpfError();
    }

    return await this.customerRepository.create({
      name,
      cpf,
      email,
      phone,
      address
    });
  }
}