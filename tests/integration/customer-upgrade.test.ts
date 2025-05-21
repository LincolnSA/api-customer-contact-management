import request from "supertest";
import { server } from "./../../src/server";
import { prisma } from "./../../src/libs/prisma";
import { redis } from "./../../src/libs/redis";

describe("PUT /customers/{id}", () => {
  let token: string;
  let customerId: string;

  beforeEach(async () => {
    await redis.flushall();
    await prisma.contact.deleteMany();
    await prisma.customer.deleteMany();

    const customer = await request(server)
      .post('/customers')
      .send({
        name: "Example",
        email: "example@gmail.com",
        cpf: "123.456.789-00",
        phone: "(12) 3 12345678",
        address: "Example"
      });

    customerId = customer.body.data.id;

    const login = await request(server)
      .post('/auth/login')
      .send({ email: customer.body.data.email });

    token = login.body.data.token;
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  it("should update a customer successfully", async () => {
    const body = {
      name: "Example",
      email: "example1@gmail.com",
      cpf: "123.456.789-11",
      phone: "(12) 3 12345678",
      address: "Example"
    };

    const customer = await request(server)
      .put(`/customers/${customerId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(customer.status).toBe(200);
    expect(customer.body.message).toBe("Cliente atualizado com sucesso");
  });

  it("should return error if fields not found", async () => {
    const body = {
      name: "    ",
      email: "example@gmail.com",
      cpf: "123.456.789-00",
      phone: "(12) 3 12345678",
      address: "Example"
    };

    const customer = await request(server)
      .put(`/customers/${customerId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(customer.status).toBe(400);
    expect(customer.body.message).toBe("Erro de validação");
  });

  it("should return error if email exists", async () => {
    const body = {
      name: "Example",
      email: "example2@gmail.com",
      cpf: "123.456.789-11",
      phone: "(12) 3 12345678",
      address: "Example"
    };

    await request(server)
      .post('/customers')
      .send(body);

    const customer = await request(server)
      .put(`/customers/${customerId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(customer.status).toBe(400);
    expect(customer.body.message).toBe("Email já cadastrado");
  });

  it("should return error if cpf exists", async () => {
    const body = {
      name: "Example",
      email: "example2@gmail.com",
      cpf: "123.456.789-11",
      phone: "(12) 3 12345678",
      address: "Example"
    };

    await request(server)
      .post('/customers')
      .send(body);

    const customer = await request(server)
      .put(`/customers/${customerId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...body,
        email: "example3@gmail.com"
      });

    expect(customer.status).toBe(400);
    expect(customer.body.message).toBe("CPF já cadastrado");
  });
});