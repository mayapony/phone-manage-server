import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Item } from './modules/item/item.entity';
import { Phone } from './modules/phone/phone.entity';
import { PhoneModule } from './modules/phone/phone.module';
import { ItemModule } from './modules/item/item.module';
import { RecordModule } from './modules/record/record.module';
import { Record } from './modules/record/record.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '52wangzai',
      database: 'phone',
      entities: [Phone, Item, Record],
      synchronize: true,
    }),
    PhoneModule,
    ItemModule,
    RecordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
