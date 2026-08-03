import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateRequestDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUUID()
  categoryId?: string;
}