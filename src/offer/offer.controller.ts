import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  SerializeOptions,
  ParseUUIDPipe,
  Request,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { OfferResponseDto } from './dto/offer-response.dto';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  // NOTE: REMOVE HARDCODED VALUE (for iser id)
  @Post()
  create(@Body() createOfferDto: CreateOfferDto, @Request() req) {
    return this.offerService.create(createOfferDto, req.user.id);
  }

  @Get()
  @SerializeOptions({ type: OfferResponseDto })
  findAll() {
    return this.offerService.findAll();
  }

  @Get(':id')
  @SerializeOptions({ type: OfferResponseDto })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.offerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOfferDto: UpdateOfferDto,
  ) {
    return this.offerService.update(+id, updateOfferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.offerService.remove(+id);
  }
}
