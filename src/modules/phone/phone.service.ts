import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IResponse } from 'src/interfaces/IResponse';
import { Repository } from 'typeorm';
import { StockInDto } from '../item/dto/stockIn.dto';
import { Phone } from './phone.entity';

@Injectable()
export class PhoneService {
  private response: IResponse;

  constructor(
    @InjectRepository(Phone)
    private phoneRepository: Repository<Phone>,
  ) {}

  findAll(): Promise<Phone[]> {
    return this.phoneRepository.find({ relations: ['items'] });
  }

  async findBrandName() {
    let data: any;
    try {
      data = await this.phoneRepository
        .createQueryBuilder('phone')
        .select('phone.brandName')
        .distinct(true)
        .getRawMany();
    } catch (err) {
      return (this.response = {
        status: false,
        message: err,
      });
    }
    return (this.response = {
      status: true,
      data: data,
    });
  }

  async findModel(stockInDto: StockInDto) {
    let data: string[] = [];
    if (stockInDto.brandName === '') {
      data = [];
    } else {
      try {
        const res = await this.phoneRepository
          .createQueryBuilder('phone')
          .select('phone.model')
          .distinct(true)
          .where('phone.brandName = :brandName', {
            brandName: stockInDto.brandName,
          })
          .getRawMany();
        for (const r of res) data.push(r.phone_model);
      } catch (err) {
        console.log(err);
        return (this.response = {
          status: false,
          message: err,
        });
      }
    }
    return (this.response = {
      status: true,
      data,
    });
  }

  async findColor(stockInDto: StockInDto) {
    let data: string[] = [];
    if (stockInDto.model === '') {
      data = [];
    } else {
      try {
        const res = await this.phoneRepository
          .createQueryBuilder('phone')
          .select('phone.color')
          .distinct(true)
          .where('phone.brandName = :brandName and phone.model = :model', {
            brandName: stockInDto.brandName,
            model: stockInDto.model,
          })
          .getRawMany();
        for (const r of res) data.push(r.phone_color);
      } catch (err) {
        console.log(err);
        return (this.response = {
          status: false,
          message: err,
        });
      }
    }
    return (this.response = {
      status: true,
      data,
    });
  }
}
