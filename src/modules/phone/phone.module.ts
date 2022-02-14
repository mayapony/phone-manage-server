import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phone } from './phone.entity';
import { PhoneService } from './phone.service';
import { PhoneController } from './phone.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Phone])],
  providers: [PhoneService],
  controllers: [PhoneController],
  exports: [TypeOrmModule],
})
export class PhoneModule {}
