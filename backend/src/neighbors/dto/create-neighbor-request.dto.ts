import { IsUUID } from 'class-validator';

export class CreateNeighborRequestDto {
  @IsUUID()
  neighborId: string;
}