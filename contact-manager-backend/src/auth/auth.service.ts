import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        if (user && bcrypt.compareSync(pass, user.passwordHash)) {
            return user;
        }
        return 'null';
    }

    async login(user: any) {
        const payload = {
            email: user.email,
            sub: user.id,
            isAdmin: user.isAdmin,
        };
        return {
            access_token: this.jwtService.signAsync(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: '1d',
            }),
        };
    }
}
