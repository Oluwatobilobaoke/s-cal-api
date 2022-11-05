/* eslint-disable @typescript-eslint/ban-ts-comment */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Calculation } from './calculations.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CalculationDto } from './calculation.dto';
import calculator from './calculate';
import { Request } from 'express';
import { Supabase } from './../../common/supabase';

@Injectable()
export class CalculationService {
  @InjectRepository(Calculation)
  private readonly repository: Repository<Calculation>;

  constructor(private readonly supabase: Supabase) {}

  public async calculate(body: CalculationDto, req: Request): Promise<string> {
    const { expression }: CalculationDto = body;

    const response = calculator(expression);
    const user = req.user;

    // @ts-ignore
    const calculation: Calculation = new Calculation();

    // @ts-ignore
    calculation.user_id = String(user.sub);
    calculation.expression = expression;
    calculation.result = response;

    this.repository.save(calculation);
    return calculation.result;
  }

  public async findOne(id: number): Promise<Calculation> {
    const calculation = this.repository.findOne({ where: { id: id } });
    if (!calculation)
      throw new HttpException('Calculation not found', HttpStatus.NOT_FOUND);
    return calculation;
  }

  // get calculations by user id
  public async findByUserId(req: Request): Promise<Calculation[]> {
    const calculations = this.repository.find({
      // @ts-ignore
      where: { user_id: req.user?.sub },
    });
    if (!calculations)
      throw new HttpException('Calculations not found', HttpStatus.NOT_FOUND);
    return calculations;
  }

  // delete calculation by id
  public async delete(id: number): Promise<void> {
    const deletedCal = this.repository.delete({ id: id });
    if (!deletedCal)
      throw new HttpException('Calculation not found', HttpStatus.NOT_FOUND);
  }
}
