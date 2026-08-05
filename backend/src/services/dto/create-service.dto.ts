export class CreateServiceDto {
  title: string;

  description?: string;

  serviceType?: 'FREE' | 'PAID' | 'BARTER';

  priceFrom?: number;

  priceTo?: number;

  currency?: string;

  categoryId?: string;
}