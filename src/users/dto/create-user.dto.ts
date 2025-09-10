import { IsString, IsEmail, IsInt, MinLength, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail()
  secretEmail: string;
}