import { forwardRef, Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users.model";
import { AuthModule } from "../auth/auth.module";
import { UserTagService } from "./user-tag.service";
import { TagsModule } from "../tags/tags.module";

@Module({
  providers: [UsersService, UserTagService],
  controllers: [UsersController, UsersController],
  exports: [UsersService, TypeOrmModule],
  imports: [
    forwardRef(() => AuthModule),
    TagsModule,
    TypeOrmModule.forFeature([User]),
  ],
})
export class UsersModule {}
