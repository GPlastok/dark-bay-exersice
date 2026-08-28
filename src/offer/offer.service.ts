import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Auction } from 'src/auction/entities/auction.entity';
import { Repository } from 'typeorm';
import { AuctionService } from 'src/auction/auction.service';
import { DataSource } from 'typeorm';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private readonly offers: Repository<Offer>,
    @InjectRepository(Auction)
    private readonly auctions: Repository<Auction>,
    private readonly auctionService: AuctionService,
    private readonly dataSource: DataSource,
  ) {}
  //

  // CHECK FOR REFACTOR NEED (relation of auntion update)
  async create(createOfferDto: CreateOfferDto, bidderId: string) {
    const auction = await this.auctions.findOneBy({
      id: createOfferDto.auctionId,
    });
    if (!auction)
      throw new NotFoundException(
        `Auction with id ${createOfferDto.auctionId} not found.`,
      );
    if (auction.sellerId === bidderId)
      throw new ForbiddenException(
        'You are not allowed to bid your own auction',
      );
    if (auction.endDate < new Date())
      throw new ConflictException('Auction is closed');
    const currentPrice = auction.currentPrice
      ? auction.currentPrice
      : auction.sellingPrice;
    if (currentPrice >= createOfferDto.biddingPrice)
      throw new ConflictException(
        `Your bid was lower than the current price and could not be placed. Please bid more than ${currentPrice}`,
      );
    await this.dataSource.transaction(async (transactionalEntityManager) => {
      const offer = this.offers.create({ ...createOfferDto, bidderId });
      const saved = await transactionalEntityManager.save(offer);
      // const saved = await this.offers.save(offer);

      if (saved.id) {
        await this.auctionService.update(auction.id, {
          currentPrice: offer.biddingPrice,
        });
      }

      return saved;
    });
  }

  findAll() {
    return this.offers.find();
  }

  findOne(id: string) {
    return this.offers.findOneBy({ id });
  }

  update(id: number, updateOfferDto: UpdateOfferDto) {
    return `This action updates a #${id} offer`;
  }

  remove(id: number) {
    return `This action removes a #${id} offer`;
  }
}
