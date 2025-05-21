import request from "supertest";
import { server } from "./../../src/server";

describe("Health check", () => {
  it("should return ok", async () => {
    const response = await request(server)
      .get("/health-check");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Serviço está funcionando");
  });
});