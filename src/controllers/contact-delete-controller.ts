import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IContactDeleteUseCase } from "../interfaces/contact-use-case-interface";

export class ContactDeleteController {

  constructor(private contactDeleteUseCase: IContactDeleteUseCase) { }

  public async handle(request: Request, response: Response): Promise<any> {
    const payload = {
      id: request.params.id,
      customerId: request.user.id
    };

    await this.contactDeleteUseCase.execute(payload);

    return response
      .status(StatusCodes.OK)
      .json({
        message: "Contato deletado com sucesso",
      });
  }
}