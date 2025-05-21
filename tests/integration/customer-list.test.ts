import request from "supertest";
import { server } from "./../../src/server";
import { prisma } from "./../../src/libs/prisma";
import { redis } from "./../../src/libs/redis";

describe("GET /customers", () => {
  let token: string;

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

    const login = await request(server)
      .post('/auth/login')
      .send({ email: customer.body.data.email });

    token = login.body.data.token;
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  it("should list customers successfully", async () => {
    const customers = await request(server)
      .get(`/customers`)
      .set('Authorization', `Bearer ${token}`);

    expect(customers.status).toBe(200);
    expect(customers.body.message).toBe("Clientes listados com sucesso");
  });
});