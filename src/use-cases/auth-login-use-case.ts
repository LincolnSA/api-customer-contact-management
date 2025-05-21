import { sign } from "jsonwebtoken";

import { IAuthLoginUseCase } from "../interfaces/auth-use-case-interface";
import { ICustomerRepository } from "../interfaces/customer-repository-interface";
import { AuthLoginInputDTO, AuthLoginOuputDTO } from "../dtos/auth-dto";
import { CustomerNotFoundError } from "../errors/customer-error";

import { env } from "../env";

export class AuthLoginUseCase implements IAuthLoginUseCase {

  constructor(private customerRepository: ICustomerRepository) { }

  async execute(input: AuthLoginInputDTO): Promise<AuthLoginOuputDTO> {
    const { email } = input;

    const customer = await this.customerRepository.findByEmail({ email });

    if (!customer) {
      throw new CustomerNotFoundError();
    }

    const token = sign(
      { email: customer.email },
      env.JWT_SECRET_KEY,
      { subject: customer.id }
    );

    return { token };
  }
}