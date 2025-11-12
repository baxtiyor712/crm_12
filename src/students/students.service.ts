// src/students/students.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { Student, StudentDocument } from './entities/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    // Student Document bilan ishlash uchun Mongoose Model'ni injeksiya qilish
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  // 1. CREATE: Yangi talaba (murojaat) yaratish
  async create(createStudentInput: CreateStudentInput): Promise<Student> {
    const createdStudent = new this.studentModel(createStudentInput);
    return createdStudent.save();
  }

  // 2. READ: Barcha talabalarni topish
  async findAll(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  // 3. READ: ID bo'yicha yagona talabani topish
  async findOne(id: string): Promise<Student> {
    const student = await this.studentModel.findById(id).exec();
    if (!student) {
      throw new NotFoundException(`Student with ID "${id}" not found`);
    }
    return student;
  }
  
  // 4. UPDATE: Talaba ma'lumotlarini yangilash
  async update(id: string, updateStudentInput: UpdateStudentInput): Promise<Student> {
    const updatedStudent = await this.studentModel.findByIdAndUpdate(
      id,
      { $set: updateStudentInput },
      { new: true }, // Yangilangan hujjatni qaytarish uchun
    ).exec();

    if (!updatedStudent) {
        throw new NotFoundException(`Student with ID "${id}" not found for update`);
    }

    return updatedStudent;
  }

  // 5. DELETE: Talabani o'chirish (agar kerak bo'lsa, bu yerda yumshoq o'chirishni ham qo'shish mumkin)
  async remove(id: string): Promise<Student> {
    const deletedStudent = await this.studentModel.findByIdAndDelete(id).exec();
    if (!deletedStudent) {
        throw new NotFoundException(`Student with ID "${id}" not found for deletion`);
    }
    return deletedStudent;
  }
}