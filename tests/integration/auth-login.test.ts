import request from "supertest";
import { server } from "./../../src/server";
import { prisma } from "./../../src/libs/prisma";
import { redis } from "./../../src/libs/redis";

describe("POST /auth/login", () => {
  beforeEach(async () => {
    await redis.flushall();
    await prisma.contact.deleteMany();
    await prisma.customer.deleteMany();
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  it("should authenticate user with valid credentials", async () => {
    const customer = await request(server)
      .post('/customers')
      .send({
        name: "Example",
        email: "example@gmail.com",
        cpf: "123.456.789-00",
        phone: "(12) 3 12345678",
        address: "Example"
      });

    const response = await request(server)
      .post("/auth/login")
      .send({ email: customer.body.data.email });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("token");
  });

  it("should not authenticate with invalid credentials", async () => {
    const body = { email: "example@gmail.com" };

    const response = await request(server)
      .post("/auth/login")
      .send(body);

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual("Cliente não encontrado");
  });
});