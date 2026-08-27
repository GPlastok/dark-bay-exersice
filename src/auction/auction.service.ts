import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    } else if (createAuctionDto.endDate < new Date()) {
      throw new ConflictException('invalid Date');
    }
    const auction = this.auction.create(createAuctionDto);
    auction.sellerId = 'e485262b-24b2-4f2f-a96e-575197330fc8';
    return this.auction.save(auction);
  }

  findAll() {
    return this.auction.find();
  }

  findOne(id: string) {
    return this.auction.findBy({ id });
  }

  async update(id: string, updateAuctionDto: UpdateAuctionDto) {
    const auction = await this.auction.findOneBy({ id });
    if (!auction)
      throw new NotFoundException(`Auction with id ${id} not found`);

    return this.auction.update(id, updateAuctionDto);
  }

  remove(id: number) {
    return `This action removes a #${id} auction`;
  }
}
