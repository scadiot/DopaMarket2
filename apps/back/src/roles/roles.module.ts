import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesApiController } from './roles.api.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RolesService],
  controllers: [RolesApiController],
  exports: [RolesService],
})
export class RolesModule {}
