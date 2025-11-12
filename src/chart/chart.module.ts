import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/students/entities/student.entity';
import { ChartService } from './chart.service';
import { ChartResolver } from './chart.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [ChartService, ChartResolver],
  exports: [ChartService],
})
export class ChartModule { }
