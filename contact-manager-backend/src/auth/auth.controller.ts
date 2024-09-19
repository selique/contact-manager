import { Controller, Post, Body } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async signin(@Body() signInDto: SignInDto) {
        const login = await this.authService.validateUser(
            signInDto.email,
            signInDto.password,
        );
        return this.authService.login(login);
    }
}
