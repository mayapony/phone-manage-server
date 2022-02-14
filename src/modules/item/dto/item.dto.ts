import { ApiProperty } from '@nestjs/swagger';

export class ItemDto {
  @ApiProperty()
  sn: string;

  @ApiProperty({ type: Number })
  phoneId: number;
}
