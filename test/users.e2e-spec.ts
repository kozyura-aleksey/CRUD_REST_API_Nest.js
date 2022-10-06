import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { getConnectionManager } from "typeorm";

const userDto = {
  email: "user@mail.ru",
  password: "user",
};

describe("UsersController (e2e)", () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    const { body } = await request(app.getHttpServer())
      .post("/auth/login")
      .send(userDto);
    token = body.token;
  });

  it("/user (GET) - success", () => {
    return request(app.getHttpServer())
      .get("/user")
      .set("Authorization", "Bearer " + token)
      .expect(200);
  });

  afterAll(() => {
    getConnectionManager().get().close();
  });
});
