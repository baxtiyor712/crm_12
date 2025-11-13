// src/students/students.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.input';
import { UpdateStudentDto } from './dto/update-student.input';

@Controller('students') // ✅ Asosiy yo'l: /students
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // POST /students - Yangi talaba qo'shish
  @Post()
  @HttpCode(HttpStatus.CREATED) // Status 201
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  // GET /students - Barcha talabalarni olish
  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  // GET /students/:id - ID bo'yicha bitta talabani olish
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  // PATCH /students/:id - Talaba ma'lumotlarini yangilash
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  // DELETE /students/:id - Talabani o'chirish
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Status 204
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}