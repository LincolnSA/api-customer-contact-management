import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IContactCreateUseCase } from "../interfaces/contact-use-case-interface";
import { contactCreateSchema } from "../schemas/contact-schema";
import { ValidationError } from "../errors/validation-error";

export class ContactCreateController {

  constructor(private contactCreateUseCase: IContactCreateUseCase) { }

  public async handle(request: Request, response: Response): Promise<any> {
    const body = contactCreateSchema.safeParse(request.body);

    if (!body.success) {
      throw ValidationError.fromZodError(body.error);
    }

    const payload = {
      ...body.data,
      customerId: request.user.id
    };

    const result = await this.contactCreateUseCase.execute(payload);

    return response
      .status(StatusCodes.CREATED)
      .json({
        message: "Contato criado com sucesso",
        data: result
      });
  }
}