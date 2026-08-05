export class SearchServiceDto {
  title?: string;

  categoryId?: string;

  city?: string;

  district?: string;

  serviceType?: 'FREE' | 'PAID' | 'BARTER';
}