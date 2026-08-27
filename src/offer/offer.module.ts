import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { AuctionModule } from 'src/auction/auction.module';
import { Auction } from 'src/auction/entities/auction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offer, Auction]), AuctionModule],
  controllers: [OfferController],
  providers: [OfferService],
})
export class OfferModule {}
