import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ItemService } from './item.service';
import { Item } from './item.entity';
import { ItemDto } from './dto/item.dto';
import { StockInDto } from './dto/stockIn.dto';

@Controller('item')
@ApiTags('Item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Get('findAll')
  @ApiOperation({
    summary: '获取所有的item',
  })
  @ApiCreatedResponse({
    description: '所有的item',
    type: [Item],
  })
  async findAll(): Promise<Item[]> {
    return await this.itemService.findAll();
  }

  @Post('create')
  async create(@Body() itemDto: ItemDto) {
    return this.itemService.createOne(itemDto);
  }

  @Post('stock-in')
  async stockIn(@Body() stockInDto: StockInDto) {
    return this.itemService.stockIn(stockInDto);
  }

  @Post('find-by-sn')
  async findBySn(@Body() body: { sn: string }) {
    return this.itemService.findBySn(body.sn);
  }
}
