import { ApiProperty } from '@nestjs/swagger';

export class StockInDto {
  @ApiProperty()
  brandName: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  ram: number;

  @ApiProperty()
  rom: number;

  @ApiProperty()
  sn: string[];
}
