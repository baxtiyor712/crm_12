import { CreateChartInput } from './create-chart.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateChartInput extends PartialType(CreateChartInput) {
  @Field(() => Int)
  id: number;
}
