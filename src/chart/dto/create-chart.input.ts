import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateChartInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
