import { PartialType } from '@nestjs/swagger';
import { CreateAuctionDto } from './create-auction.dto';
import { IsNumber } from 'class-validator';

export class UpdateAuctionDto extends PartialType(CreateAuctionDto) {
  @IsNumber()
  currentPrice: number;
}
