import { Trim } from 'class-sanitizer';
import { IsOptional, IsString } from 'class-validator';
export class CalculationDto {
  @IsString()
  public readonly user_id: string;

  @Trim()
  @IsString()
  public readonly expression: string;

  @IsString()
  @IsOptional()
  public readonly result?: string;
}
