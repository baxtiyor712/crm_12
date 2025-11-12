import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AttendanceService } from './attendance.service';
import { Attendance } from './entities/attendance.entity';
import { CreateAttendanceInput } from './dto/create-attendance.input';

@Resolver(() => Attendance)
export class AttendanceResolver {
  constructor(private readonly attendanceService: AttendanceService) { }

  @Mutation(() => [Attendance])
  async markAttendance(
    @Args('records', { type: () => [CreateAttendanceInput] }) records: CreateAttendanceInput[],
  ) {
    return this.attendanceService.markMany(records);
  }

  @Query(() => [Attendance])
  async getAttendanceByLesson(@Args('lessonId') lessonId: string) {
    return this.attendanceService.findByLesson(lessonId);
  }

  @Query(() => [Attendance])
  async getAttendanceByStudent(@Args('studentId') studentId: string) {
    return this.attendanceService.findByStudent(studentId);
  }
}
