import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersApiController } from './users.api.controller';
import { User } from './users.entity';
import { Role } from '../roles/roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [UsersService],
  controllers: [UsersApiController],
  exports: [UsersService],
})
export class UsersModule {}
