import { IContactRepository } from "../interfaces/contact-repository-interface";
import { ContactUpdateInputDTO } from "../dtos/contact-dto";
import { ContactNotFoundError } from "../errors/contact-error";

export class ContactUpdateUseCase {

  constructor(private readonly contactRepository: IContactRepository) { }

  public async execute(input: ContactUpdateInputDTO) {
    const { id, customerId } = input;

    const contact = await this.contactRepository.get({ id, customerId });

    if (!contact) {
      throw new ContactNotFoundError();
    }

    return await this.contactRepository.update(input);
  }
}