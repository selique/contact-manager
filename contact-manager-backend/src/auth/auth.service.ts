import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Password Mismatch');
        }

        const passwordMatch = bcrypt.compareSync(password, user.passwordHash);
        if (!passwordMatch) {
            throw new UnauthorizedException('Password Mismatch');
        }

        return user;
    }

    async login(user: any) {
        const payload = {
            email: user.email,
            sub: user.id,
            isAdmin: user.isAdmin,
        };

        const access_token = await this.jwtService.signAsync(payload);

        return {
            access_token,
        };
    }
}
