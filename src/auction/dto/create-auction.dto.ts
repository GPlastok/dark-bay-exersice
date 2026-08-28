import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAuctionDto {
  @ApiProperty({
    example: 'boring item',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'descriptopn for the boring item',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: '50',
    description: 'Starting Price for the auction',
  })
  @IsNumber()
  @IsNotEmpty()
  sellingPrice: number;

  @ApiPropertyOptional({
    example: '2026-08-25',
    description: 'End Date for the auction and its optional',
  })
  @IsDate()
  endDate: Date;
}
