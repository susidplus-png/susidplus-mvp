export class CreateServiceDto {
  title: string;

  description?: string;

  priceFrom?: number;

  priceTo?: number;

  currency?: string;

  categoryId?: string;
}