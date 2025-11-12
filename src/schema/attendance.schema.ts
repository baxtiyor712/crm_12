import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AttendanceDocument = Attendance & Document;

@Schema({ timestamps: true })
export class Attendance {
  @Prop({ required: true })
  studentId: string;

  @Prop({ required: true })
  lessonId: string;

  @Prop({ required: true, enum: ['present', 'absent'] })
  status: string;

  @Prop({ required: true })
  date: string;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
