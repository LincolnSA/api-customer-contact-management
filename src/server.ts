import "dotenv/config";
import express from "express";
import cors from "cors";
import { env } from "./env";
import { router } from "./routes";
import { logger, expressLogger, expressErrorLogger } from "./libs/logger";
import { ErrorHandlerMiddleware } from "./middlewares/error-handler-middleware";

const server = express();
const port = env.APP_PORT;
const errorHandlerMiddleware = new ErrorHandlerMiddleware();

server.use(expressLogger);
server.use(cors());
server.use(express.json());
server.use(router);
server.use(expressErrorLogger);
server.use(errorHandlerMiddleware.handle);

server.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

export { server };