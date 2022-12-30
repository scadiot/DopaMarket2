import { Controller, Render, Body, Post } from '@nestjs/common';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

class loginValidationDto {
  email: string;
  password: string;
}

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async loginValidation(@Body() loginValidationDto: loginValidationDto) {
    const token = await this.authService.validateAndCreateToken(
      loginValidationDto.email,
      loginValidationDto.password,
    );

    if (token) {
      return { success: true, token };
    } else {
      return { success: false };
    }
  }
}
