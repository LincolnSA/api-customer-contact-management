import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ICustomerGetUseCase } from "../interfaces/customer-use-case-interface";

export class CustomerGetController {

  constructor(private customerGetUseCase: ICustomerGetUseCase) { }

  public async handle(request: Request, response: Response): Promise<any> {
    const id = request.params.id

    const result = await this.customerGetUseCase.execute({ id });

    return response
      .status(StatusCodes.OK)
      .json({
        message: "Cliente encontrado com sucesso",
        data: result
      });
  }
}