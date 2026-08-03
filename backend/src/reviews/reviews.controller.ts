import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(
    private reviewsService: ReviewsService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateReviewDto,
  ) {
    return this.reviewsService.create(
      '1946c159-7253-4b6c-822d-cc4ece03b747',
      dto,
    );
  }

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }
}