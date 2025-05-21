import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ICustomerCreateUseCase } from "../interfaces/customer-use-case-interface";
import { customerCreateSchema } from "../schemas/customer-schema";
import { ValidationError } from "../errors/validation-error";

export class CustomerCreateController {

  constructor(private customerCreateUseCase: ICustomerCreateUseCase) { }

  public async handle(request: Request, response: Response): Promise<any> {
    const body = customerCreateSchema.safeParse(request.body);

    if (!body.success) {
      throw ValidationError.fromZodError(body.error);
    }

    const result = await this.customerCreateUseCase.execute(body.data);

    return response
      .status(StatusCodes.CREATED)
      .json({
        message: "Cliente criado com sucesso",
        data: result
      });
  }
}