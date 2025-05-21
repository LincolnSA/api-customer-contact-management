import request from "supertest";
import { server } from "./../../src/server";
import { prisma } from "./../../src/libs/prisma";
import { redis } from "./../../src/libs/redis";

describe("Contact flow", () => {
  let customerEmail: string;
  let token: string;
  let contactId: string;

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

    customerEmail = response.body.data.email

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Cliente criado com sucesso");
  });

  it("should authenticate user with valid credentials", async () => {
    const body = {
      email: customerEmail,
    };

    const response = await request(server)
      .post("/auth/login")
      .send(body);

    token = response.body.data.token;

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Autenticação realizada com sucesso");
  });

  it("should create a contact successfully", async () => {
    const body = {
      name: "Example",
      phone: "(12) 3 12345678"
    };

    const response = await request(server)
      .post(`/contacts`)
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    contactId = response.body.data.id;

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Contato criado com sucesso");
  });

  it("should get a contact successfully", async () => {
    const response = await request(server)
      .get(`/contacts/${contactId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Contato encontrado com sucesso");
  });

  it("should update a contact successfully", async () => {
    const body = {
      name: "Example",
      phone: "(12) 3 12345678"
    };

    const response = await request(server)
      .put(`/contacts/${contactId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(body);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Contato atualizado com sucesso");
  });

  it("should delete a contact successfully", async () => {
    const response = await request(server)
      .delete(`/contacts/${contactId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Contato deletado com sucesso");
  });
});