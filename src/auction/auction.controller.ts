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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuctionService } from './auction.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';

import { AuctionFilterDto } from './dto/auction-filter.dto';
import { Public } from 'src/auth/auth-jwt.guards';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuctionResponseDto } from './dto/auction-response.dto';

//

//
//
@ApiTags('auctions')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized access' })
@Controller('auction')
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  @Post()
  @ApiOperation({ summary: 'Create an auction' })
  @ApiCreatedResponse({ description: 'Auction created' })
  @ApiConflictResponse({
    description: 'End date should not be earlier than the current date',
  })
  create(@Body() createAuctionDto: CreateAuctionDto, @Request() req) {
    return this.auctionService.create(createAuctionDto, req.user.id);
  }

  @Public()
  @Get()
  @ApiQuery({ name: 'status', required: false, enum: ['open', 'closed'] })
  @ApiQuery({ name: 'minPrice', required: false, type: Number })
  @ApiQuery({ name: 'maxPrice', required: false, type: Number })
  @ApiOperation({ summary: 'Get all auctions based on the filters' })
  @ApiOkResponse({ type: AuctionResponseDto })
  findAll(@Query() paging: AuctionFilterDto) {
    return this.auctionService.findAll(paging);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an auction by id' })
  @ApiOkResponse({ type: AuctionResponseDto })
  @ApiNotFoundResponse({ description: 'No auction exists with this id' })
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Delete operation successfull, no content to add',
  })
  remove(@Param('id') id: string) {
    return this.auctionService.remove(+id);
  }
}
