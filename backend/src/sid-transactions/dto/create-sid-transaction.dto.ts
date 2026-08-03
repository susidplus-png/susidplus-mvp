import { IsInt, IsString, IsUUID } from 'class-validator';

export class CreateSidTransactionDto {

  @IsUUID()
  userId: string;


  @IsUUID()
  interactionId: string;


  @IsInt()
  amount: number;


  @IsString()
  reason: string;


  @IsString()
  type: string;
}