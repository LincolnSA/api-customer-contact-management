import { IContactRepository } from "../interfaces/contact-repository-interface";
import { ContactDeleteInputDTO } from "../dtos/contact-dto";
import { ContactNotFoundError } from "../errors/contact-error";

export class ContactDeleteUseCase {

  constructor(private readonly contactRepository: IContactRepository) { }

  public async execute(input: ContactDeleteInputDTO) {
    const { id, customerId } = input;

    const contact = await this.contactRepository.get({ id, customerId });

    if (!contact) {
      throw new ContactNotFoundError();
    }

    return await this.contactRepository.delete(input);
  }
}