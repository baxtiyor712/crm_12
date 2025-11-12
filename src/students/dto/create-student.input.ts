import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateStudentInput {
  @Field()
  fullName: string

  @Field()
  phone: string; 

  @Field()
  direction: string;

  @Field()
  parentName: string; 

  @Field()
  parentPhone: string; 

  @Field({ nullable: true })
  photo?: string; 
}
