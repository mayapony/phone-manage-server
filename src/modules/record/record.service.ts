import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IResponse } from 'src/interfaces/IResponse';
import { Repository } from 'typeorm';
import { Item } from '../item/item.entity';
import { CreateRecordsDto } from './dto/createRecordsDto';
import { Record } from './record.entity';

@Injectable()
export class RecordService {
  private response: IResponse;
  constructor(
    @InjectRepository(Record)
    private recordRepository: Repository<Record>,
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async createRecords(createRecordsDto: CreateRecordsDto) {
    let data: any;
    try {
      const record = await this.recordRepository.create(createRecordsDto);
      data = await this.recordRepository.save(record);
      await this.itemRepository.delete({ sn: createRecordsDto.sn });
    } catch (err) {
      console.error(err);
      return (this.response = {
        status: false,
        message: err,
      });
    }
    return (this.response = {
      status: true,
      data,
    });
  }

  async findRecords() {
    try {
      const data = await this.recordRepository.find({
        order: {
          created_at: 'DESC',
        },
      });
      return (this.response = {
        status: true,
        data,
      });
    } catch (err) {
      console.log(err);
      return (this.response = {
        status: false,
        message: err,
      });
    }
  }
}
