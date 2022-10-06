import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AuthModule } from "../src/auth/auth.module";
import { AppModule } from "../src/app.module";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { getConnectionManager } from "typeorm";

const userDto: CreateUserDto = {
  email: "user@mail.ru",
  password: "user",
  id: "",
  nickame: "",
};

describe("AuthController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AuthModule],
      providers: [AppModule, AuthModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it("/auth/login (POST) - success", () => {
    return request(app.getHttpServer())
      .post("/auth/login")
      .send(userDto)
      .expect(201);
  });

  it("/auth/login (POST) - fail password", () => {
    return request(app.getHttpServer())
      .post("/auth/login")
      .send({ ...userDto, password: "2" })
      .expect(401, {
        HttpStatus: 401,
        message: "Некорректный email или password",
      });
  });

  afterAll(() => {
    getConnectionManager().get().close();
  });
});
