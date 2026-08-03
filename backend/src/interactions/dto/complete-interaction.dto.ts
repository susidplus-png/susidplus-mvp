import { IsUUID } from 'class-validator';

export class CompleteInteractionDto {
  @IsUUID()
  interactionId: string;
}