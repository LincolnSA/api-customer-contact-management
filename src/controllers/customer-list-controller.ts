import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ICustomerListUseCase } from "../interfaces/customer-use-case-interface";

export class CustomerListController {

  constructor(private customerListUseCase: ICustomerListUseCase) { }

  public async handle(request: Request, response: Response): Promise<any> {

    const result = await this.customerListUseCase.execute();

    return response
      .status(StatusCodes.OK)
      .json({
        message: "Clientes listados com sucesso",
        data: result
      });
  }
}