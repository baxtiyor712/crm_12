import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendanceService } from './attendance.service';
import { AttendanceResolver } from './attendance.resolver';
import { Attendance, AttendanceSchema } from 'src/schema/attendance.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Attendance.name, schema: AttendanceSchema }]),
  ],
  providers: [AttendanceResolver, AttendanceService],
})
export class AttendanceModule { }
