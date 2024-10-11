import { Module } from '@nestjs/common';
import { CalculatorController } from './calculator/calculator.controller';
import { CalculatorService } from './calculator/calculator.service';

@Module({
  imports: [],
  controllers: [CalculatorController],
  providers: [CalculatorService],
})
export class AppModule {}
