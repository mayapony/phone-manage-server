import { Item } from 'src/modules/item/item.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Phone {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'ID',
  })
  id: number;

  @Column()
  @ApiProperty({
    description: '品牌名',
    required: true,
    type: String,
    enum: ['oppo', 'vivo'],
  })
  brandName: string;

  @Column()
  @ApiProperty({})
  model: string;

  @Column()
  @ApiProperty({})
  ram: number;

  @Column()
  @ApiProperty({})
  rom: number;

  @Column()
  @ApiProperty({})
  color: string;

  @Column()
  @ApiProperty({ description: '售价' })
  price: number;

  @Column({ nullable: true })
  @ApiProperty({ description: '进价' })
  rawPrice?: number;

  @OneToMany(() => Item, (item) => item.phone)
  @ApiProperty({})
  items: Item[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
