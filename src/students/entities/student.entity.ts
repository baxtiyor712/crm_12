// src/students/entities/student.entity.ts

import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// MongoDB/Mongoose tomonidan ishlatiladigan Document interfeysi
export type StudentDocument = Student & Document;

@ObjectType()
@Schema({ timestamps: true }) // createdAt va updatedAt avtomatik qo'shiladi
export class Student {
  
  // GraphQL tomonidan yaratilgan ID
  @Field(() => ID)
  id: string;

  // 1. Talabaning ismi
  @Prop({ required: true })
  @Field(() => String, { description: "Talabaning to'liq ismi" })
  studentName: string;

  // 2. Telefon raqami
  @Prop({ required: true, unique: true })
  @Field(() => String, { description: "Aloqa uchun telefon raqami" })
  phoneNumber: string;

  // 3. Qo'shimcha izoh (Botda ixtiyoriy, lekin bazada mavjud)
  @Prop({ required: false })
  @Field(() => String, { nullable: true, description: "Qo'shimcha izoh" })
  note: string;
  
  // 4. Murojaat holati (yangi, ko'rib chiqilmoqda, yopilgan)
  @Prop({ 
      type: String, 
      enum: ['new', 'pending', 'closed'], 
      default: 'new' 
  })
  @Field(() => String, { description: "Murojaat holati (new, pending, closed)" })
  status: 'new' | 'pending' | 'closed';

  // Mongoose tomonidan avtomatik kiritiladigan vaqt tamg'alari
  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

export const StudentSchema = SchemaFactory.createForClass(Student);