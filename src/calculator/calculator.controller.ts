import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { CalculatorService } from './calculator.service';

@Controller('evaluate')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Post()
  async evaluate(@Body('expression') expression: string) {
    if (!expression || typeof expression !== 'string') {
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
    }

    try {
      const result = await this.calculatorService.calculate(expression);
      return { result };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
