import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private db: DrizzleService) {}

  create(createUserDto: CreateUserDto) {
    return this.db.users.create({
      data: createUserDto,
    });
  }

  findOneByEmail(email: string) {
    return this.db.users.findOne({ where: { email } });
  }

  findAll() {
    return this.db.users.findMany();
  }
}
