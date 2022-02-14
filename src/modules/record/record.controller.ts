import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRecordsDto } from './dto/createRecordsDto';
import { RecordService } from './record.service';

@Controller('record')
@ApiTags('Record')
export class RecordController {
  constructor(private recordService: RecordService) {}

  @Post('create-records')
  async createRecords(@Body() createRecordsDto: CreateRecordsDto) {
    return await this.recordService.createRecords(createRecordsDto);
  }

  @Get('find-records')
  async findRecords() {
    return await this.recordService.findRecords();
  }
}
