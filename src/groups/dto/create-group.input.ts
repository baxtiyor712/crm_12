import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateGroupInput {
  @Field()
  subject: string;

  @Field()
  days: string;

  @Field()
  time: string;

  @Field()
  teacherName: string;

  @Field()
  teacherPhone: string;

  @Field({ nullable: true })
  teacherPhoto?: string;
}
