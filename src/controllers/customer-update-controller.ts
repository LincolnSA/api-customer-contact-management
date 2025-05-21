import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ICustomerUpdateUseCase } from "../interfaces/customer-use-case-interface";
import { customerUpdateSchema } from "../schemas/customer-schema";
import { ValidationError } from "../errors/validation-error";

export class CustomerUpdateController {

  constructor(private customerUpdateUseCase: ICustomerUpdateUseCase) { }

  public async handle(request: Request, response: Response): Promise<any> {
    const id = request.params.id;
    const body = customerUpdateSchema.safeParse(request.body);

    if (!body.success) {
      throw ValidationError.fromZodError(body.error);
    }

    const result = await this.customerUpdateUseCase.execute({ id, ...body.data });

    return response
      .status(StatusCodes.OK)
      .json({
        message: "Cliente atualizado com sucesso",
        data: result
      });
  }
}