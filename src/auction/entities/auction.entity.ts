import { Offer } from 'src/offer/entities/offer.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('auctions')
export class Auction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 120 })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'uuid' })
  sellerId: string;
  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'sellerId' })
  seller: User;

  @Column({ type: 'int' })
  sellingPrice: number;

  @Column({ type: 'int', nullable: true })
  currentPrice: number;

  @Column({ type: 'datetime' })
  endDate: Date;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @OneToMany(() => Offer, (offer) => offer.auction)
  offers: Offer[];
}
