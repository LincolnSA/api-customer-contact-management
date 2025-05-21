import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthLoginUseCase } from "../use-cases/auth-login-use-case";
import { authLoginSchema } from "../schemas/auth-schema";
import { ValidationError } from "../errors/validation-error";

export class AuthLoginController {

  constructor(private authLoginUseCase: AuthLoginUseCase) { }

  public async handle(request: Request, response: Response): Promise<any> {
    const body = authLoginSchema.safeParse(request.body);

    if (!body.success) {
      throw ValidationError.fromZodError(body.error);
    }

    const result = await this.authLoginUseCase.execute(body.data);

    return response
      .status(StatusCodes.OK)
      .json({
        message: "Autenticação realizada com sucesso",
        data: result
      });
  }
}