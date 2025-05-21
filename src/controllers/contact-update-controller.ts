import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IContactUpdateUseCase } from "../interfaces/contact-use-case-interface";
import { contactUpdateSchema } from "../schemas/contact-schema";
import { ValidationError } from "../errors/validation-error";

export class ContactUpdateController {

  constructor(private contactUpdateUseCase: IContactUpdateUseCase) { }

  public async handle(request: Request, response: Response): Promise<any> {
    const body = contactUpdateSchema.safeParse(request.body);

    if (!body.success) {
      throw ValidationError.fromZodError(body.error);
    }

    const payload = {
      id: request.params.id,
      customerId: request.user.id,
      ...body.data
    };

    const result = await this.contactUpdateUseCase.execute(payload);

    return response
      .status(StatusCodes.OK)
      .json({
        message: "Contato atualizado com sucesso",
        data: result
      });
  }
}