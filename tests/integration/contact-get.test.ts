import request from "supertest";
import { server } from "./../../src/server";
import { prisma } from "./../../src/libs/prisma";
import { redis } from "./../../src/libs/redis";

describe("GET /contacts/{id}", () => {
  let token: string;
  let contactId: string;

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

    const contact = await request(server)
      .post(`/contacts`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: "Example",
        phone: "(12) 3 12345678"
      });

    contactId = contact.body.data.id;
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  it("should get a contact successfully", async () => {
    const contact = await request(server)
      .get(`/contacts/${contactId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(contact.status).toBe(200);
    expect(contact.body.message).toBe("Contato encontrado com sucesso");
  });

  it("should return error if contact not found", async () => {
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxpbmNvbG5AZ21haWwuY29tIiwiaWF0IjoxNzQ3NDIwMjEwLCJzdWIiOiI3MjQ2OTNhZC1jZWVhLTQxMTEtYmQ2Ny00NTI0MzRlMzc2MDkifQ.jU4vXhhMQa83IzX9I0xANGgdUeJZtPfB3e-rFo-_TBA";
    contactId = "123";

    const contact = await request(server)
      .get(`/contacts/${contactId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(contact.status).toBe(404);
    expect(contact.body.message).toBe("Contato não encontrado");
  });
});