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
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offerService.create(
      createOfferDto,
      'e485262b-24b2-4f2f-a96e-575197330fc8',
    );
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
