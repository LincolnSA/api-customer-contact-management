import { ICustomerRepository } from "../interfaces/customer-repository-interface";
import { IContactRepository } from "../interfaces/contact-repository-interface";
import { ContactCreateInputDTO } from "../dtos/contact-dto";
import { CustomerNotFoundError } from "../errors/customer-error";

export class ContactCreateUseCase {

  constructor(
    private readonly customerRepository: ICustomerRepository,
    private readonly contactRepository: IContactRepository,
  ) { }

  public async execute(input: ContactCreateInputDTO) {
    const { customerId } = input;

    const customer = await this.customerRepository.get({ id: customerId });

    if (!customer) {
      throw new CustomerNotFoundError();
    }

    return await this.contactRepository.create(input);
  }
}