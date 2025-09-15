import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() CreateUserDto: CreateUserDto) {
    this.usersService.createUser(CreateUserDto.name, CreateUserDto.secretEmail);
    return {
      message: 'User created successfully',
      data: CreateUserDto,
    };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() CreateUserDto: CreateUserDto) {
    return this.usersService.updateUser(+id, CreateUserDto.name, CreateUserDto.secretEmail);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(+id);
  }
}
