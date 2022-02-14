import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '主键' })
  id: number;

  @Column()
  @ApiProperty({ description: '手机信息' })
  phoneInfo: string;

  @Column()
  @ApiProperty({ description: '卖价' })
  earning: number;

  @Column({ nullable: true })
  @ApiProperty({ description: '进价' })
  rawPrice: number;

  @Column({ nullable: true })
  @ApiProperty({ description: '客户手机号' })
  phoneNumber: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @ApiProperty({ description: '创建时间' })
  created_at: Date;

  @Column()
  @ApiProperty({ description: '店员' })
  employee: string;

  @Column()
  @ApiProperty({ description: '串码' })
  sn: string;
}
