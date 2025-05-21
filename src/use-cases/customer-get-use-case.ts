import { ICustomerGetUseCase } from "../interfaces/customer-use-case-interface";
import { ICustomerRepository } from "../interfaces/customer-repository-interface";
import { CustomerGetInputDTO } from "../dtos/customer-dto";
import { CustomerNotFoundError } from "../errors/customer-error";

export class CustomerGetUseCase implements ICustomerGetUseCase {

  constructor(private customerRepository: ICustomerRepository) { }

  public async execute(input: CustomerGetInputDTO) {
    const { id } = input;

    const customer = await this.customerRepository.get({ id });

    if (!customer) {
      throw new CustomerNotFoundError();
    }

    return customer;
  }
}