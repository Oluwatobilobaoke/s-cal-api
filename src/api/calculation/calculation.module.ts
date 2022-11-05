import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CalculationController } from './calculation.controller';
import { CalculationService } from './calculation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calculation } from './calculations.entity';
import { SupabaseGuard, SupabaseModule } from './../../common/supabase';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([Calculation]),
    PassportModule,
    SupabaseModule,
  ],
  controllers: [CalculationController],
  providers: [
    CalculationService,
    {
      provide: APP_GUARD,
      useClass: SupabaseGuard,
    },
  ],
})
export class CalculationModule {}
