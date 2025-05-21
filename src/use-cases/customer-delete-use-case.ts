import { ICustomerDeleteUseCase } from "../interfaces/customer-use-case-interface";
import { ICustomerRepository } from "../interfaces/customer-repository-interface";
import { CustomerDeleteInputDTO } from "../dtos/customer-dto";
import { CustomerNotFoundError } from "../errors/customer-error";

export class CustomerDeleteUseCase implements ICustomerDeleteUseCase {

  constructor(private customerRepository: ICustomerRepository) { }

  public async execute(input: CustomerDeleteInputDTO) {
    const { id } = input;

    const customer = await this.customerRepository.get({ id });

    if (!customer) {
      throw new CustomerNotFoundError();
    }

    return await this.customerRepository.delete(input);
  }
}