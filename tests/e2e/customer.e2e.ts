import request from "supertest";
import { server } from "./../../src/server";
import { prisma } from "./../../src/libs/prisma";
import { redis } from "./../../src/libs/redis";
describe("Customer flow", () => {
  let customerEmail: string;
  let customerId: string;
  let token: string;

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
    customerId = response.body.data.id;

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

    token = response.body.data.token;

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Autenticação realizada com sucesso");
  });

  it("should return error if unauthenticate", async () => {
    const response = await request(server)
      .get(`/customers/${customerId}`)
      .set('Authorization', `Bearer ${123456}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Token inválido");
  });

  it("should get a customer successfully", async () => {
    const response = await request(server)
      .get(`/customers/${customerId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Cliente encontrado com sucesso");
  });

  it("should update a customer successfully", async () => {
    const body = {
      name: "New example",
      email: "example@gmail.com",
      cpf: "123.456.789-00",
      phone: "(12) 3 12345678",
      address: "Example"
    };

    const response = await request(server)
      .put(`/customers/${customerId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Cliente atualizado com sucesso");
  });

  it("should delete a customer successfully", async () => {
    const response = await request(server)
      .delete(`/customers/${customerId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Cliente deletado com sucesso");
  });
});