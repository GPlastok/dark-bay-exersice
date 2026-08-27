import { Expose, Type } from 'class-transformer';

export class OfferResponseDto {
  @Expose()
  id: string;

  @Expose()
  auctionId: string;

  @Expose()
  biddingPrice: number;

  @Expose()
  bidderId: string;

  @Expose()
  @Type(() => Date)
  createdAt: Date;
}
