import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAuctionDto {
  @ApiProperty({
    example: 'boring item',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  sellingPrice: number;

  @IsDate()
  endDate: Date;
}
