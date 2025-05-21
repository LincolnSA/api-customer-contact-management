import { IContactRepository } from "../interfaces/contact-repository-interface";
import { ContactGetInputDTO } from "../dtos/contact-dto";
import { ContactNotFoundError } from "../errors/contact-error";

export class ContactGetUseCase {

  constructor(private readonly contactRepository: IContactRepository) { }

  public async execute(input: ContactGetInputDTO) {
    const { id, customerId } = input;

    const contact = await this.contactRepository.get({ id, customerId });

    if (!contact) {
      throw new ContactNotFoundError();
    }

    return contact;
  }
}