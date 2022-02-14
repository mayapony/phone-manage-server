import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { ItemDto } from './dto/item.dto';
import { Phone } from '../phone/phone.entity';
import { IResponse } from '../../interfaces/IResponse';
import { StockInDto } from './dto/stockIn.dto';

@Injectable()
export class ItemService {
  private response: IResponse;
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    @InjectRepository(Phone)
    private phoneRepository: Repository<Phone>,
  ) {}

  async findAll() {
    return await this.itemRepository.find();
  }

  async createOne(itemDto: ItemDto) {
    const phone: Phone = await this.phoneRepository.findOne(itemDto.phoneId);
    try {
      if (phone) {
        const obj = JSON.parse(JSON.stringify(itemDto));
        obj.phone = phone;
        const item = this.itemRepository.create(obj);
        const data = await this.itemRepository.save(item);
        this.response = {
          status: true,
          data,
        };
      } else {
        throw 'phoneId不存在。。。';
      }
    } catch (err) {
      this.response = {
        status: false,
        message: err,
      };
    }
    return this.response;
  }

  async stockIn(stockInDto: StockInDto) {
    const phoneData = {
      brandName: stockInDto.brandName,
      color: stockInDto.color,
      model: stockInDto.model,
      price: stockInDto.price,
      ram: stockInDto.ram,
      rom: stockInDto.rom,
    };
    let phone: Phone = await this.phoneRepository.findOne(phoneData);
    // 如果以前不存在
    if (!phone) {
      try {
        phone = this.phoneRepository.create(phoneData);
        await this.phoneRepository.save(phone);
      } catch (err) {
        return (this.response = {
          status: false,
          message: '创建对应产品失败，请重试',
          err: err,
        });
      }
    }
    const errSn: string[] = [];
    for (const s of stockInDto.sn) {
      try {
        const item = this.itemRepository.create({ sn: s });
        item.phone = phone;
        await this.itemRepository.save(item);
      } catch (err) {
        console.error();
        errSn.push(s);
      }
    }
    if (errSn.length > 0) {
      return (this.response = {
        status: false,
        data: errSn,
        message: '部分串码未保存成功！请检查是否重复',
      });
    }
    return (this.response = {
      status: true,
      message: '入库成功！',
    });
  }

  async findBySn(sn: string) {
    console.log(sn);
    let data: any;
    try {
      data = await this.itemRepository.findOne(
        { sn: sn },
        { relations: ['phone'] },
      );
      if (!data) {
        throw '不存在！';
      }
    } catch (err) {
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
}
