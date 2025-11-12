// src/chart/chart.resolver.ts (To'g'ri va tuzatilgan)

import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { ChartService } from './chart.service';
import { Chart } from './entities/chart.entity'; // ✅ Entity endi mavjud va import qilingan

@Resolver(() => Chart) // Resolver Chart turi uchun
export class ChartResolver {
  constructor(private readonly chartService: ChartService) { }

  @Query(() => Chart, { name: 'monthlyStats' }) // Query natijasi Chart tipida bo'lishi aytilgan
  async monthlyStats(
    @Args('year', { type: () => Int }) year: number,
    @Args('month', { type: () => Int }) month: number,
  ): Promise<Chart> {
    // ✅ Bu yerda hech qanday xato yo'q, chunki ChartService'ga getMonthlyStats qo'shilgan
    return this.chartService.getMonthlyStats(year, month);
  }
}