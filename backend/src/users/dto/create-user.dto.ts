import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+380\d{9}$/, {
    message: 'Телефон має бути у форматі +380XXXXXXXXX',
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;
}