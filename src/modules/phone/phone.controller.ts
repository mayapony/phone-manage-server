import { Controller, Get } from '@nestjs/common';
import { Phone } from './phone.entity';
import { PhoneService } from './phone.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('phone')
@ApiTags('Phone')
export class PhoneController {
  constructor(private phoneService: PhoneService) {}

  @Get('findAll')
  @ApiOperation({
    summary: '获取所有的Phone',
  })
  @ApiCreatedResponse({
    description: '所有的Phone列表',
    type: [Phone],
  })
  async findAll(): Promise<Phone[]> {
    return await this.phoneService.findAll();
  }

  @Get('find-brand-name')
  async stockList() {
    return this.phoneService.findBrandName();
  }
}
