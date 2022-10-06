import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { TagsModule } from "./tags/tags.module";
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";
import { Tag } from "./tags/tags.model";
import { AuthModule } from "./auth/auth.module";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Tag],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    TagsModule,
    AuthModule,
  ],
})
export class AppModule {}
