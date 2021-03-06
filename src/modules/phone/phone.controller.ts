import { Body, Controller, Get, Post } from '@nestjs/common';
import { Phone } from './phone.entity';
import { PhoneService } from './phone.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StockInDto } from '../item/dto/stockIn.dto';
import { FindPhoneDto } from './dto/findPhone.dto';

@Controller('phone')
@ApiTags('Phone')
export class PhoneController {
  constructor(private phoneService: PhoneService) {}

  @Post('findAll')
  @ApiOperation({
    summary: '获取所有的Phone',
  })
  @ApiCreatedResponse({
    description: '所有的Phone列表',
    type: [Phone],
  })
  async findAll(@Body() findPhoneDto: FindPhoneDto): Promise<Phone[]> {
    return await this.phoneService.findAll(findPhoneDto);
  }

  @Get('find-brand-name')
  async findBrandName() {
    return this.phoneService.findBrandName();
  }

  @Post('find-model')
  async findModel(@Body() stockInDto: StockInDto) {
    return this.phoneService.findModel(stockInDto);
  }

  @Post('find-color')
  async findColor(@Body() StockInDto: StockInDto) {
    return this.phoneService.findColor(StockInDto);
  }
}
