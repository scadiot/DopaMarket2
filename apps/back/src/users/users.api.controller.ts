import { Controller, Get, Post, Body, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UserDto } from './users.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('api/users')
export class UsersApiController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<UserDto[]> {
    return await this.usersService.getAll();
  }

  @Post()
  async addUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.usersService.create(createUserDto);
  }

  @Patch()
  async updateUser(@Body() updateUserDto: UserDto): Promise<UserDto> {
    return await this.usersService.update(updateUserDto);
  }
}
