import { Expose, Type } from 'class-transformer';

export class AuctionResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;
  @Expose()
  sellerId: string;
  @Expose()
  sellingPrice: number;
  @Expose()
  currentPrice: number;

  @Expose()
  @Type(() => Date)
  endDate: Date;

  @Expose()
  @Type(() => Date)
  createdAt: Date;
}
