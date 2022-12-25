import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  rolesIds: number[];
}

export class CreateUserDto {
  @ApiProperty({
    description: 'user email',
  })
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  rolesIds: number[];
}

export class UpdateUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty({
    description: 'user email',
  })
  email?: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  rolesIds?: number[];
}
