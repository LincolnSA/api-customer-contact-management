import { ICustomerListUseCase } from "../interfaces/customer-use-case-interface";
import { ICustomerRepository } from "../interfaces/customer-repository-interface";

export class CustomerListUseCase implements ICustomerListUseCase {

  constructor(private customerRepository: ICustomerRepository) { }

  public async execute() {
    return await this.customerRepository.list();
  }
}