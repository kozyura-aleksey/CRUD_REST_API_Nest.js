import { Body, HttpException, HttpStatus, Injectable, Request, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/users.model';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    private async generateToken(user: User) {
        const payload = { email: user.email, id: user.id, nickname: user.nickname };
        return {
            token: this.jwtService.sign(payload),
        }
    }

    async singIn(@Body() dto: CreateUserDto) {
        const candidate = await this.userService.findUser(dto);
        if (candidate) {
            throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(dto.password, 5);
        const user = await this.userService.createUser({ ...dto, password: hashPassword })
        return this.generateToken(user)
    }

    async validateUser(dto: CreateUserDto) {
        const user = await this.userService.findUserById(dto.id)
        const passwordEqual = await bcrypt.compare(dto.password, user.password)
        if (user && passwordEqual) {
            return user;
        }
        throw new UnauthorizedException({ message: 'Некорректный email или password' })
    }

    async login(@Body() dto: CreateUserDto) {
        const user = await this.validateUser(dto);
        return this.generateToken(user);
    }

    async logout(@Body() dto: CreateUserDto) {
        //return this.jwtService.decode(dto);
    }
}
