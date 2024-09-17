import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DrizzleService } from '../drizzle/drizzle.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, DrizzleService],
})
export class UsersModule {}
