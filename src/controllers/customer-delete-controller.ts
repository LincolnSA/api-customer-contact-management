import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ICustomerDeleteUseCase } from "../interfaces/customer-use-case-interface";

export class CustomerDeleteController {

  constructor(private customerDeleteUseCase: ICustomerDeleteUseCase) { }

  public async handle(request: Request, response: Response): Promise<any> {
    const id = request.params.id;

    await this.customerDeleteUseCase.execute({ id });

    return response
      .status(StatusCodes.OK)
      .json({
        message: "Cliente deletado com sucesso",
      });
  }
}