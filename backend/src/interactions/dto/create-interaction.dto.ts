import { IsUUID } from 'class-validator';

export class CreateInteractionDto {
  @IsUUID()
  requestId: string;
}