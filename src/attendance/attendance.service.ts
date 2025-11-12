import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAttendanceInput } from './dto/create-attendance.input';
import { Attendance, AttendanceDocument } from 'src/schema/attendance.schema';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name) private model: Model<AttendanceDocument>,
  ) { }

  async markMany(records: CreateAttendanceInput[]): Promise<Attendance[]> {
    return this.model.insertMany(records);
  }

  async findByLesson(lessonId: string): Promise<Attendance[]> {
    return this.model.find({ lessonId }).exec();
  }

  async findByStudent(studentId: string): Promise<Attendance[]> {
    return this.model.find({ studentId }).exec();
  }
}

