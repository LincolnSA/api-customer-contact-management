import {
  AuthLoginInputDTO,
  AuthLoginOuputDTO
} from "../dtos/auth-dto";

export interface IAuthLoginUseCase {
  execute(input: AuthLoginInputDTO): Promise<AuthLoginOuputDTO>;
}