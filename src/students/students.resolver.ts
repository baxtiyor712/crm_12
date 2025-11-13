// src/students/students.resolver.ts

import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { StudentsService } from './students.service';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.input';
import { UpdateStudentDto } from './dto/update-student.input';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(private readonly studentsService: StudentsService) { }

  // ------------------------------------------------------------------
  // MUTATIONS (Ma'lumotlarni o'zgartirish)
  // ------------------------------------------------------------------

  @Mutation(() => Student, { description: 'Yangi talaba murojaatini yaratish' })
  createStudent(@Args('createStudentInput') createStudentInput: CreateStudentDto) {
    return this.studentsService.create(createStudentInput);
  }

  @Mutation(() => Student, { description: 'Mavjud talaba ma\'lumotlarini yangilash' })
  updateStudent(@Args('updateStudentInput') updateStudentInput: UpdateStudentDto) {
    // ID ni Stringga o'tkazib yuborish
    return this.studentsService.update(String(updateStudentInput.id), updateStudentInput);
  }

  @Mutation(() => Student, { description: 'Talabani tizimdan o\'chirish' })
  removeStudent(@Args('id', { type: () => ID }) id: string) {
    return this.studentsService.remove(id);
  }

  // ------------------------------------------------------------------
  // QUERIES (Ma'lumotlarni o'qish)
  // ------------------------------------------------------------------

  @Query(() => [Student], { name: 'students', description: 'Barcha talabalar ro\'yxatini qaytaradi' })
  findAll() {
    return this.studentsService.findAll();
  }

  @Query(() => Student, { name: 'student', description: 'ID bo\'yicha yagona talabani qaytaradi' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.studentsService.findOne(id);
  }
}