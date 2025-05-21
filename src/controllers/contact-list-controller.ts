import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IContactListUseCase } from "../interfaces/contact-use-case-interface";

export class ContactListController {

  constructor(private contactListUseCase: IContactListUseCase) { }

  public async handle(request: Request, response: Response): Promise<any> {
    const payload = {
      customerId: request.user.id
    };

    const result = await this.contactListUseCase.execute(payload);

    return response
      .status(StatusCodes.OK)
      .json({
        message: "Contatos listados com sucesso",
        data: result
      });
  }
}