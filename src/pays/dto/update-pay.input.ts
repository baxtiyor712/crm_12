import { CreatePayInput } from './create-pay.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePayInput extends PartialType(CreatePayInput) {
  @Field(() => Int)
  id: number;
}
