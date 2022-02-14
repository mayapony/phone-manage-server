import { Phone } from 'src/modules/phone/phone.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ unique: false })
  @ApiProperty()
  sn: string;

  @ManyToOne(() => Phone, (phone) => phone.items)
  @ApiProperty({ type: Number })
  phone: Phone;

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
