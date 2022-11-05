import { IsOptional, IsString } from 'class-validator';
export class CalculationDto {
  @IsString()
  public readonly ucaser_id: string;

  @IsString()
  public readonly expression: string;

  @IsString()
  @IsOptional()
  public readonly result?: string;
}
