import { IsNumber, IsOptional, IsIn } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/paging.dto';

export class AuctionFilterDto extends PaginationQueryDto {
  @IsOptional()
  @IsIn(['open', 'closed'])
  status: string;

  @IsOptional()
  @IsNumber()
  minPrice: number;

  @IsOptional()
  @IsNumber()
  maxPrice: number;
}
