import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateOfferDto {
  @IsNotEmpty()
  @IsUUID()
  auctionId: string;

  @IsNotEmpty()
  @IsNumber()
  biddingPrice: number;
}
