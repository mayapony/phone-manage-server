import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRecordsDto } from './dto/createRecordsDto';
import { SearchRecordsDto } from './dto/searchRecordsDto';
import { RecordService } from './record.service';

@Controller('record')
@ApiTags('Record')
export class RecordController {
  constructor(private recordService: RecordService) {}

  @Post('create-records')
  async createRecords(@Body() createRecordsDto: CreateRecordsDto) {
    return await this.recordService.createRecords(createRecordsDto);
  }

  @Post('find-records')
  async findRecords(@Body() searchRecordsDto: SearchRecordsDto) {
    return await this.recordService.findRecords(searchRecordsDto);
  }
}
