import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repository/users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async create(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        return this.usersRepository.createUser({
            email: createUserDto.email,
            passwordHash: hashedPassword,
            isAdmin: createUserDto.isAdmin,
        });
    }

    async findOneByEmail(email: string) {
        return this.usersRepository.findOneByEmail(email);
    }

    async findAll() {
        // Considerando que findAll é uma função personalizada; ajuste conforme necessário
        return this.usersRepository.findAllUsers();
    }
}
