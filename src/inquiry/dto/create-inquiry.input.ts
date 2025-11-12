import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateInquiryInput {
  @Field()
  studentName: string;

  @Field()
  phoneNumber: string;

  @Field()
  note: string;
}
