import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TagsModule } from "../tags/tags.module";
import { User } from "../users/users.model";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.SECRET_KEY || "SECRET",
      signOptions: {
        expiresIn: process.env.EXPIRE_IN || "30m",
      },
    }),
  ],
})
export class AuthModule {}
