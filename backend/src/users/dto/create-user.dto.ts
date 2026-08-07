import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Matches(/^\+380\d{9}$/, {
    message: 'Телефон має бути у форматі +380XXXXXXXXX',
  })
  phone: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}