import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IContactGeUseCase } from "../interfaces/contact-use-case-interface";

export class ContactGetController {

  constructor(private contactGetUseCase: IContactGeUseCase) { }

  public async handle(request: Request, response: Response): Promise<any> {
    const payload = {
      id: request.params.id,
      customerId: request.user.id
    };

    const result = await this.contactGetUseCase.execute(payload);

    return response
      .status(StatusCodes.OK)
      .json({
        message: "Contato encontrado com sucesso",
        data: result
      });
  }
}