import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Req,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/roles.guard';

@Controller('contacts')
@UseGuards(JwtGuard)
export class ContactsController {
    constructor(private readonly contactsService: ContactsService) {}

    @Post()
    async create(@Body() createContactDto: CreateContactDto, @Req() req) {
        const userId = req.user.userId;
        return await this.contactsService.create(createContactDto, userId);
    }

    @Get()
    findAll(@Req() req) {
        return this.contactsService.findAllByUser(req.user.userId);
    }

    @Patch(':id')
    update(
        @Param('id') id: number,
        @Body() updateContactDto: UpdateContactDto,
    ) {
        return this.contactsService.update(id, updateContactDto);
    }

    @Delete(':id')
    @UseGuards(AdminGuard)
    remove(@Param('id') id: number) {
        return this.contactsService.remove(id);
    }
}
