import request from "supertest";
import { server } from "./../../src/server";
import { prisma } from "./../../src/libs/prisma";
import { redis } from "./../../src/libs/redis";

describe("DELETE /customers/{id}", () => {
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

  it("should delete a customer successfully", async () => {
    const customer = await request(server)
      .delete(`/customers/${customerId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(customer.status).toBe(200);
    expect(customer.body.message).toBe("Cliente deletado com sucesso");
  });

  it("should return error if customer not found", async () => {
    customerId = "123";

    const customer = await request(server)
      .delete(`/customers/${customerId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(customer.status).toBe(404);
    expect(customer.body.message).toBe("Cliente não encontrado");
  });
});