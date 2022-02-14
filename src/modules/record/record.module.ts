import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from '../item/item.module';
import { RecordController } from './record.controller';
import { Record } from './record.entity';
import { RecordService } from './record.service';

@Module({
  imports: [TypeOrmModule.forFeature([Record]), ItemModule],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
