import { Router } from "express";

import { ContactRepository } from "../repositories/contact-repository";
import { CustomerRepository } from "../repositories/customer-repository";

import { CacheProvider } from "../providers/cache-provider";

import { ContactCreateUseCase } from "../use-cases/contact-create-use-case";
import { ContactListUseCase } from "../use-cases/contact-list-use-case";
import { ContactGetUseCase } from "../use-cases/contact-get-use-case";
import { ContactUpdateUseCase } from "../use-cases/contact-update-use-case";
import { ContactDeleteUseCase } from "../use-cases/contact-delete-use-case";

import { ContactCreateController } from "../controllers/contact-create-controller";
import { ContactListController } from "../controllers/contact-list-controller";
import { ContactGetController } from "../controllers/contact-get-controller";
import { ContactUpdateController } from "../controllers/contact-update-controller";
import { ContactDeleteController } from "../controllers/contact-delete-controller";

import { AuthenticatedMiddleware } from "../middlewares/authenticated-middleware";

const router = Router();

const cacheProvider = new CacheProvider();

const contactRepository = new ContactRepository(cacheProvider);
const customerRepository = new CustomerRepository(cacheProvider);

const contactCreateUseCase = new ContactCreateUseCase(customerRepository, contactRepository);
const contactListUseCase = new ContactListUseCase(contactRepository);
const contactGetUseCase = new ContactGetUseCase(contactRepository);
const contactUpdateUseCase = new ContactUpdateUseCase(contactRepository);
const contactDeleteUseCase = new ContactDeleteUseCase(contactRepository);

const contactCreateController = new ContactCreateController(contactCreateUseCase);
const contactListController = new ContactListController(contactListUseCase);
const contactGetController = new ContactGetController(contactGetUseCase);
const contactUpdateController = new ContactUpdateController(contactUpdateUseCase);
const contactDeleteController = new ContactDeleteController(contactDeleteUseCase);

const authenticatedMiddleware = new AuthenticatedMiddleware();

router.post("/contacts",
  (request, response, next) => authenticatedMiddleware.handle(request, response, next),
  (request, response) => contactCreateController.handle(request, response)
);

router.get("/contacts",
  (request, response, next) => authenticatedMiddleware.handle(request, response, next),
  (request, response) => contactListController.handle(request, response)
);

router.get("/contacts/:id",
  (request, response, next) => authenticatedMiddleware.handle(request, response, next),
  (request, response) => contactGetController.handle(request, response)
);

router.put("/contacts/:id",
  (request, response, next) => authenticatedMiddleware.handle(request, response, next),
  (request, response) => contactUpdateController.handle(request, response)
);

router.delete("/contacts/:id",
  (request, response, next) => authenticatedMiddleware.handle(request, response, next),
  (request, response) => contactDeleteController.handle(request, response)
);

export { router };