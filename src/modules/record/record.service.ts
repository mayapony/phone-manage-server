import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IResponse } from 'src/interfaces/IResponse';
import { Between, Not, Repository } from 'typeorm';
import { Item } from '../item/item.entity';
import { CreateRecordsDto } from './dto/createRecordsDto';
import { SearchRecordsDto } from './dto/searchRecordsDto';
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
      // 仅仅删除一个
      const item: Item = await this.itemRepository.findOne({
        sn: createRecordsDto.sn,
      });
      await this.itemRepository.remove(item);
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

  async findRecords(searchRecordsDto: SearchRecordsDto) {
    const where = {
      created_at: Between(
        new Date(searchRecordsDto.dateRange[0]),
        new Date(searchRecordsDto.dateRange[1]),
      ),
    };
    if (searchRecordsDto.paid) {
      where['earning'] = Not(0);
    } else {
      where['earning'] = 0;
    }
    try {
      const data = await this.recordRepository.find({
        order: {
          created_at: 'DESC',
        },
        where: where,
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
