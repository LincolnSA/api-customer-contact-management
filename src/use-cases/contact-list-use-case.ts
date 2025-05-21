import { IContactRepository } from "../interfaces/contact-repository-interface";
import { ContactListInputDTO } from "../dtos/contact-dto";

export class ContactListUseCase {

  constructor(private readonly contactRepository: IContactRepository) { }

  public async execute(input: ContactListInputDTO) {
    const { customerId } = input;

    return await this.contactRepository.list({ customerId });
  }
}