import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "../libs/logger";

export class HealthCheckController {
  public async handle(request: Request, response: Response): Promise<any> {
    const data = {
      service: {
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage()
      },
      database: {
        status: "connected"
      }
    };

    logger.info("Health check successful", { data });

    return response
      .status(StatusCodes.OK)
      .json({
        message: "Serviço está funcionando",
        data
      });
  }
}