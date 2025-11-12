import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { ChartService } from './chart.service';
import { Chart } from './entities/chart.entity';

@Resolver()
export class ChartResolver {
  constructor(private readonly chartService: ChartService) { }

  @Query(() => Chart)
  async monthlyStats(
    @Args('year', { type: () => Int }) year: number,
    @Args('month', { type: () => Int }) month: number,
  ): Promise<Chart> {
    return this.chartService.getMonthlyStats(year, month);
  }
}
