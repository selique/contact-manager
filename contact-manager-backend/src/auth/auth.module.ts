import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [UsersModule],
    providers: [AuthService, JwtService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
