import {
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class SearchRequestDto {

  @IsOptional()
  @IsUUID()
  categoryId?: string;


  @IsOptional()
  @IsString()
  status?: string;


  @IsOptional()
  @IsString()
  search?: string;

}