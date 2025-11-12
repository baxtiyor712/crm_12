import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { StudentsService } from './students.service';
import { Student } from './entities/student.entity';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(private readonly studentsService: StudentsService) { }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Student)
  async createStudent(
    @Args("createStudentInput") createStudentInput: CreateStudentInput,
    @Context() context,
  ) {
    const user = context.req.user;
    return this.studentsService.create(createStudentInput, user.userId);
  }

  @Query(() => [Student], { name: 'students' })
  findAll() {
    return this.studentsService.findAll();
  }

  @Query(() => Student, { name: 'student' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.studentsService.findOne(id);
  }

  @Mutation(() => Student)
  updateStudent(@Args('updateStudentInput') updateStudentInput: UpdateStudentInput) {
    return this.studentsService.update(updateStudentInput.id, updateStudentInput);
  }

  @Mutation(() => Student)
  removeStudent(@Args('id', { type: () => Int }) id: number) {
    return this.studentsService.remove(id);
  }

  @Mutation(() => Student)
  leaveStudent(@Args('id', { type: () => Int }) id: number) {
    return this.studentsService.leave(id);
  }
}
