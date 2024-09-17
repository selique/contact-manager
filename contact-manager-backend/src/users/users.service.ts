import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { CreateUserDto } from './dto/create-user.dto';
import { users } from '../drizzle/schema';

@Injectable()
export class UsersService {
    constructor(private database: DrizzleService) {}

    create(createUserDto: CreateUserDto) {
        return this.database.select().from(users).insert(createUserDto);
    }

    findOneByEmail(email: string) {
        return this.db.users.findOne({ where: { email } });
    }

    findAll() {
        return this.db.users.findMany();
    }
}
