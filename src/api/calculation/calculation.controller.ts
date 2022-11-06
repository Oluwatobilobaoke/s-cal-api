import {
  Body,
  Controller,
  Inject,
  Post,
  Get,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
  Delete,
} from '@nestjs/common';

import { CalculationService } from './calculation.service';
import { Request } from 'express';
import { CalculationDto } from './calculation.dto';

@Controller('calculation')
export class CalculationController {
  @Inject(CalculationService)
  private readonly service: CalculationService;

  @Post('')
  @UseInterceptors(ClassSerializerInterceptor)
  private calculate(
    @Body() body: CalculationDto,
    @Req() req: Request,
  ): Promise<string> {
    console.log('requser', req.user);

    return this.service.calculate(body, req);
  }
  @Get('')
  @UseInterceptors(ClassSerializerInterceptor)
  private calculations(@Req() req: Request): Promise<any> {
    return this.service.findByUserId(req);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  private calculation(@Req() req: Request): Promise<any> {
    return this.service.findOne(Number(req.params.id));
  }

  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  private delete(@Req() req: Request): Promise<any> {
    return this.service.delete(Number(req.params.id));
  }
}
