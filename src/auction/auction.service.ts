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
import { Offer } from 'src/offer/entities/offer.entity';
import { privateDecrypt } from 'crypto';
import { AuctionResponseDto } from './dto/auction-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuctionService {
  constructor(
    @InjectRepository(Auction)
    private readonly auction: Repository<Auction>,
    @InjectRepository(Offer)
    private readonly offer: Repository<Offer>,
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

  async findOne(id: string): Promise<Partial<AuctionResponseDto>> {
    const auctionres = await this.auction.findBy({ id });
    if (!auctionres)
      throw new NotFoundException(`Auction with id ${id} not found`);
    const offers = await this.offer.find({ where: { auctionId: id } });
   // const auctionOffer: AuctionResponseDto = { ...auctionres, offers };
    return plainToInstance(AuctionResponseDto, { ...auctionres, offers });
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
