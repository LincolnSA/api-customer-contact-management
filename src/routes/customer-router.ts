import { Router } from "express";

import { CustomerRepository } from "../repositories/customer-repository";
import { CacheProvider } from "../providers/cache-provider";

import { CustomerCreateUseCase } from "../use-cases/customer-create-use-case";
import { CustomerGetUseCase } from "../use-cases/customer-get-use-case";
import { CustomerListUseCase } from "../use-cases/customer-list-use-case";
import { CustomerUpdateUseCase } from "../use-cases/customer-update-use-case";
import { CustomerDeleteUseCase } from "../use-cases/customer-delete-use-case";

import { CustomerCreateController } from "../controllers/customer-create-controller";
import { CustomerGetController } from "../controllers/customer-get-controller";
import { CustomerListController } from "../controllers/customer-list-controller";
import { CustomerUpdateController } from "../controllers/customer-update-controller";
import { CustomerDeleteController } from "../controllers/customer-delete-controller";

import { AuthenticatedMiddleware } from "../middlewares/authenticated-middleware";

const router = Router();

const cacheProvider = new CacheProvider();

const customerRepository = new CustomerRepository(cacheProvider);

const customerCreateUseCase = new CustomerCreateUseCase(customerRepository);
const customerGetUseCase = new CustomerGetUseCase(customerRepository);
const customerListUseCase = new CustomerListUseCase(customerRepository);
const customerUpdateUseCase = new CustomerUpdateUseCase(customerRepository);
const customerDeleteUseCase = new CustomerDeleteUseCase(customerRepository);

const customerCreateController = new CustomerCreateController(customerCreateUseCase);
const customerGetController = new CustomerGetController(customerGetUseCase);
const customerListController = new CustomerListController(customerListUseCase);
const customerUpdateController = new CustomerUpdateController(customerUpdateUseCase);
const customerDeleteController = new CustomerDeleteController(customerDeleteUseCase);

const authenticatedMiddleware = new AuthenticatedMiddleware();

router.post("/customers",
  (request, response) => customerCreateController.handle(request, response)
);

router.get("/customers",
  (request, response, next) => authenticatedMiddleware.handle(request, response, next),
  (request, response) => customerListController.handle(request, response)
);

router.get("/customers/:id",
  (request, response, next) => authenticatedMiddleware.handle(request, response, next),
  (request, response) => customerGetController.handle(request, response)
);

router.put("/customers/:id",
  (request, response, next) => authenticatedMiddleware.handle(request, response, next),
  (request, response) => customerUpdateController.handle(request, response)
);

router.delete("/customers/:id",
  (request, response, next) => authenticatedMiddleware.handle(request, response, next),
  (request, response) => customerDeleteController.handle(request, response)
);

export { router };