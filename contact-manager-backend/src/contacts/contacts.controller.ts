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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/roles.guard';

@Controller('contacts')
@UseGuards(JwtAuthGuard)
export class ContactsController {
    constructor(private readonly contactsService: ContactsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createContactDto: CreateContactDto, @Req() req) {
        const result = await this.contactsService.create(
            createContactDto,
            req.user.id,
        );
        return {
            message: 'Contact created successfully!',
            result,
        };
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Req() req) {
        return this.contactsService.findAllByUser(req.user.id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(
        @Param('id') id: number,
        @Body() updateContactDto: UpdateContactDto,
    ) {
        return this.contactsService.update(id, updateContactDto);
    }

    @Delete(':id')
    @UseGuards(AdminGuard, JwtAuthGuard)
    remove(@Param('id') id: number) {
        return this.contactsService.remove(id);
    }
}
