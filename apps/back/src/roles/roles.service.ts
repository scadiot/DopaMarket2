import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './roles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService implements OnModuleInit {
  roles: Role[];

  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async onModuleInit() {
    const roles = await this.rolesRepository.find();
    if (!roles.some((r) => r.tag === 'admin')) {
      this.rolesRepository.save({
        description: 'Application administration',
        name: 'Administrator',
        tag: 'admin',
      });
      console.log('Admin role added');
    }
    this.roles = await this.rolesRepository.find();
  }

  getRoles(): Role[] {
    return this.roles;
  }

  getRoleByTag(tag: string): Role | undefined {
    return this.roles.find((r) => r.tag === tag);
  }
}
