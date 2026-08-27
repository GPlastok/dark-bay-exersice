import { Injectable } from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auction } from './entities/auction.entity';

@Injectable()
export class AuctionService {
  constructor(
    @InjectRepository(Auction)
    private readonly auction: Repository<Auction>,
  ) {}

  create(createAuctionDto: CreateAuctionDto) {
    if (createAuctionDto.endDate == undefined) {
      const date = new Date();
      createAuctionDto.endDate = date;
      createAuctionDto.endDate.setDate(date.getDate() + 3);
    }
    const auction = this.auction.create(createAuctionDto);
    auction.sellerId = 'e485262b-24b2-4f2f-a96e-575197330fc8';
    return this.auction.save(auction);
  }

  findAll() {
    return `This action returns all auction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auction`;
  }

  update(id: number, updateAuctionDto: UpdateAuctionDto) {
    return `This action updates a #${id} auction`;
  }

  remove(id: number) {
    return `This action removes a #${id} auction`;
  }
}
