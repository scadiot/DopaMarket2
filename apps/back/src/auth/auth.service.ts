import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: User) {
    return {
      access_token: this.createToken(user),
    };
  }

  async createToken(user: User) {
    const payload = {
      email: user.email,
      userId: user.id,
      roles: user.roles ? user.roles.map((r) => r.tag) : [],
    };
    return this.jwtService.sign(payload);
  }

  async validateAndCreateToken(
    email: string,
    password: string,
  ): Promise<string> {
    const user = await this.usersService.validPassword(email, password);
    if (!user) {
      return;
    }
    return this.createToken(user);
  }

  decode(token: string): any {
    return this.jwtService.decode(token);
  }
}
