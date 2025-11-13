// src/students/entities/student.entity.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema({ timestamps: true })
export class Student {
  
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  phone: string; // Login uchun ishlatilishi mumkin

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false })
  birthDate?: Date;

  // Guruh ID si Groups moduliga bog'lanadi (Groups Module bilan integratsiya uchun)
  @Prop({ type: Types.ObjectId, ref: 'Group', required: false })
  groupId?: Types.ObjectId; 

  @Prop({ 
      type: String, 
      enum: ['to\'langan', 'qarzdor', 'yangi'], 
      default: 'yangi' 
  })
  paymentStatus: 'to\'langan' | 'qarzdor' | 'yangi';
}

export const StudentSchema = SchemaFactory.createForClass(Student);