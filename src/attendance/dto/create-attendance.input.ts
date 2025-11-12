import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAttendanceInput {
  @Field()
  studentId: string;

  @Field()
  lessonId: string;

  @Field()
  status: string;

  @Field()
  date: string;
}
