import { Body, Controller, Headers, Post, Request } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/singin')
    singIn(@Body() dto: CreateUserDto) {
        return this.authService.singIn(dto);
    }

    @Post('/login')
    login(@Body() dto: CreateUserDto) {
        return this.authService.login(dto);
    }

    @Post('/logout')
    logout(@Body() dto: CreateUserDto) {
        return this.authService.logout(dto);
    }
}
