import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DrizzleService } from '../drizzle/drizzle.service';
import { UsersRepository } from './repository/users.repository';

@Module({
    controllers: [UsersController],
    providers: [UsersService, DrizzleService, UsersRepository],
    exports: [UsersService],
})
export class UsersModule {}
