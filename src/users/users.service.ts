import { ConsoleLogger, Injectable, Request, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { updateUserDto } from "./dto/update-user.dto";
import { User } from "./users.model";
import { deleteUserDto } from "./dto/delete-user.dto";
import { findUserDto } from "./dto/find-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(dto);
    this.userRepository.save(user);
    return user;
  }

  async findUser(dto: findUserDto): Promise<User[]> {
    const user = await this.userRepository.find({
      where: dto,
      relations: ["createdTags"],
    });
    return user;
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }

  async updateUser(dto: updateUserDto): Promise<User> {
    const user = await this.userRepository.findOne(dto.id);
    console.log(user);
    this.userRepository.merge(user, dto);
    this.userRepository.save(user);
    return user;
  }

  async deleteUser(dto: deleteUserDto) {
    const user = await this.userRepository.delete(dto);
    return user;
  }
}
