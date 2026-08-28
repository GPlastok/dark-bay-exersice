import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  Request,
} from '@nestjs/common';
import { AuctionService } from './auction.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';

import { AuctionFilterDto } from './dto/auction-filter.dto';
import { Public } from 'src/auth/auth-jwt.guards';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auction')
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  @Post()
  @ApiOperation({ summary: 'Create an auction' })
  create(@Body() createAuctionDto: CreateAuctionDto, @Request() req) {
    return this.auctionService.create(createAuctionDto, req.user.id);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all auctions based on the filters' })
  findAll(@Query() paging: AuctionFilterDto) {
    return this.auctionService.findAll(paging);
  }

  @Get(':id')
    @ApiOperation({ summary: 'Get an auction by id' })
  //@SerializeOptions({ type: AuctionResponseDto })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.auctionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAuctionDto: UpdateAuctionDto,
  ) {
    return this.auctionService.update(id, updateAuctionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auctionService.remove(+id);
  }
}
