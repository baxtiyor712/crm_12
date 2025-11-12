import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePayInput {
  @Field()
  studentName: string;

  @Field()
  direction: string;

  @Field()
  phoneNumber: string;

  @Field()
  teacherName: string;

  @Field()
  paymentDate: Date;
}
