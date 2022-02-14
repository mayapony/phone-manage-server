import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { PhoneModule } from '../phone/phone.module';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), PhoneModule],
  providers: [ItemService],
  controllers: [ItemController],
  exports: [TypeOrmModule],
})
export class ItemModule {}
