export interface SearchRecordsDto {
  dateRange: [number, number];
  paid: boolean;
  keyword?: string;
}
