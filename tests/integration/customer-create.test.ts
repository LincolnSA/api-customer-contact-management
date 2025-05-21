import request from "supertest";
import { server } from "./../../src/server";
import { prisma } from "./../../src/libs/prisma";
import { redis } from "./../../src/libs/redis";

describe("POST /customers", () => {
  beforeEach(async () => {
    await redis.flushall();
    await prisma.contact.deleteMany();
    await prisma.customer.deleteMany();
  });

  afterEach(async () => {
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

    const customer = await request(server)
      .post('/customers')
      .send(body);

    expect(customer.status).toBe(201);
    expect(customer.body.message).toBe("Cliente criado com sucesso");
    expect(customer.body.data).toHaveProperty("id");
  });

  it("should return error if fields not found", async () => {
    const body = {
      // name: "Example",
      email: "example@gmail.com",
      cpf: "123.456.789-00",
      phone: "(12) 3 12345678",
      address: "Example"
    };

    const customer = await request(server)
      .post('/customers')
      .send(body);

    expect(customer.status).toBe(400);
    expect(customer.body.message).toBe("Erro de validação");
  });

  it("should return error if email exists", async () => {
    const body = {
      name: "Example",
      email: "example@gmail.com",
      cpf: "123.456.789-00",
      phone: "(12) 3 12345678",
      address: "Example"
    };

    await request(server)
      .post('/customers')
      .send(body);

    const customer = await request(server)
      .post('/customers')
      .send(body);

    expect(customer.status).toBe(400);
    expect(customer.body.message).toBe("Email já cadastrado");
  });

  it("should return error if cpf exists", async () => {
    const body = {
      name: "Example",
      email: "example@gmail.com",
      cpf: "123.456.789-00",
      phone: "(12) 3 12345678",
      address: "Example"
    };

    await request(server)
      .post('/customers')
      .send(body);

    const customer = await request(server)
      .post('/customers')
      .send({ ...body, email: "example2@gmail.com" });

    expect(customer.status).toBe(400);
    expect(customer.body.message).toBe("CPF já cadastrado");
  });
});