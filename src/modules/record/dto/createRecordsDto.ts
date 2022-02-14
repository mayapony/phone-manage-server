import { ApiProperty } from '@nestjs/swagger';

export class CreateRecordsDto {
  @ApiProperty({ description: '手机信息' })
  phoneInfo: string;

  @ApiProperty({ description: '卖价' })
  earning: number;

  @ApiProperty({ description: '进价' })
  rawPrice?: number;

  @ApiProperty({ description: '客户手机号' })
  phoneNumber: string;

  @ApiProperty({ description: '店员' })
  employee: string;

  @ApiProperty({ description: '串码' })
  sn: string;
}
