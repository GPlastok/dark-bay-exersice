import { User } from 'src/user/entities/user.entity';
import { Auction } from 'src/auction/entities/auction.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('offers')
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  bidderId: string;
  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'bidderId' })
  bidder: User;

  @Column({ type: 'int' })
  biddingPrice: number;

  @Column({ type: 'varchar' })
  auctionId: string;
  @ManyToOne(() => Auction, { nullable: false })
  @JoinColumn({ name: 'auctionId' })
  auction: Auction;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;
}
