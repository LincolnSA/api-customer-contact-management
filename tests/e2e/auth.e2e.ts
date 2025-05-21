import request from "supertest";
import { server } from "./../../src/server";
import { prisma } from "./../../src/libs/prisma";
import { redis } from "./../../src/libs/redis";
describe("Authentication", () => {
  let customerEmail: string;

  beforeAll(async () => {
    await redis.flushall();
    await prisma.contact.deleteMany();
    await prisma.customer.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should create a customer successfully", async () => {
    const body = {
      name: "Example",
      email: "example@gmail.com",
      cpf: "123.456.789-00",
      phone: "(12) 3 12345678",
      address: "Example"
    };

    const response = await request(server)
      .post('/customers')
      .send(body);

    customerEmail = response.body.data.email;

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Cliente criado com sucesso");
  });

  it("should authenticate user with valid credentials", async () => {
    const body = {
      email: customerEmail
    };

    const response = await request(server)
      .post("/auth/login")
      .send(body);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("token");
  });

  it("should not authenticate with invalid credentials", async () => {
    const body = {
      email: "example-invalid@gmail.com"
    };

    const response = await request(server)
      .post("/auth/login")
      .send(body);

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual("Cliente não encontrado");
  });
});