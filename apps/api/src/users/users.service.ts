import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In } from 'typeorm';
import { Role } from '../roles/roles.entity';
import { CreateUserDto, UpdateUserDto, UserDto } from './users.dto';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async getAll(): Promise<UserDto[]> {
    return this.mapArrayToUserDto(await this.usersRepository.find());
  }

  async getUserByMail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({
      where: { email },
      relations: ['roles'],
    });
  }

  async findByMail(email: string): Promise<UserDto | undefined> {
    const user = await this.getUserByMail(email);
    return user ? this.mapToUserDto(user) : undefined;
  }

  async validPassword(email: string, password: string): Promise<User> {
    const user = await this.getUserByMail(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const roles = await this.rolesRepository.findByIds(createUserDto.rolesIds);
    const userData = {
      email: createUserDto.email,
      password: createUserDto.password,
      roles,
    };
    const user = await this.usersRepository.save(userData);
    return this.mapToUserDto(user);
  }

  async update(updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.usersRepository.findOneBy({ id: updateUserDto.id });
    user.roles = await this.rolesRepository.find({
      where: { id: In(updateUserDto.rolesIds) },
    });
    user.email = updateUserDto.email ? updateUserDto.email : user.email;
    user.password = updateUserDto.password
      ? updateUserDto.email
      : user.password;
    await this.usersRepository.save(user);
    return this.mapToUserDto(user);
  }

  async mapToUserDto(user: User): Promise<UserDto> {
    const userDto: UserDto = {
      id: user.id,
      email: user.email,
      rolesIds: user.roles ? user.roles.map((r) => r.id) : undefined,
    };
    return userDto;
  }

  async mapArrayToUserDto(users: User[]): Promise<UserDto[]> {
    return Promise.all(users.map((u) => this.mapToUserDto(u)));
  }
}
