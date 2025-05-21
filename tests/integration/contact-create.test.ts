import request from "supertest";
import { server } from "./../../src/server";
import { prisma } from "./../../src/libs/prisma";
import { redis } from "./../../src/libs/redis";

describe("POST /contacts", () => {
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
      .post("/auth/login")
      .send({ email: customer.body.data.email });

    token = login.body.data.token;
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  it("should create a contact successfully", async () => {
    const body = {
      name: "Example",
      phone: "(12) 3 12345678"
    };

    const contact = await request(server)
      .post(`/contacts`)
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(contact.status).toBe(201);
    expect(contact.body.message).toBe("Contato criado com sucesso");
  });

  it("should return error if fields not found", async () => {
    const body = {
      // name: "Example",
      phone: "(12) 3 12345678"
    };

    const contact = await request(server)
      .post(`/contacts`)
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(contact.status).toBe(400);
    expect(contact.body.message).toBe("Erro de validação");
  });

  it("should return error if customer not found", async () => {
    const body = {
      name: "Example",
      phone: "(12) 3 12345678"
    };

    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxpbmNvbG5AZ21haWwuY29tIiwiaWF0IjoxNzQ3NDIwMjEwLCJzdWIiOiI3MjQ2OTNhZC1jZWVhLTQxMTEtYmQ2Ny00NTI0MzRlMzc2MDkifQ.jU4vXhhMQa83IzX9I0xANGgdUeJZtPfB3e-rFo-_TBA";

    const contact = await request(server)
      .post(`/contacts`)
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(contact.status).toBe(404);
    expect(contact.body.message).toBe("Cliente não encontrado");
  });
});