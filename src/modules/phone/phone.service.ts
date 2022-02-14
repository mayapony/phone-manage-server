import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IResponse } from 'src/interfaces/IResponse';
import { Repository } from 'typeorm';
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
}
