import { Body, Controller, Delete, Get, Put, UseGuards } from "@nestjs/common";
import { deleteUserDto } from "./dto/delete-user.dto";
import { updateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";
import { findUserDto } from "./dto/find-user.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { User } from "./users.model";

@UseGuards(JwtAuthGuard)
@Controller("user")
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  findUser(dto: findUserDto): Promise<User[]> {
    return this.userService.findUser(dto);
  }

  @Get()
  findUserById(dto: findUserDto): Promise<User> {
    return this.userService.findUserById(dto.id);
  }

  @Put()
  updateUser(@Body() dto: updateUserDto): Promise<User> {
    return this.userService.updateUser(dto);
  }

  @Delete()
  deleteUser(@Body() dto: deleteUserDto) {
    return this.userService.deleteUser(dto);
  }
}
