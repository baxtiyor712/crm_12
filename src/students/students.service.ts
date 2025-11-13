// src/students/students.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/create-student.input';
import { UpdateStudentDto } from './dto/update-student.input';
import { Student, StudentDocument } from './entities/student.entity'; 

@Injectable()
export class StudentsService {
  constructor(
    // Student modelini in'yeksiya qilish
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  // 1. CREATE: Yangi talaba qo'shish
  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const createdStudent = new this.studentModel(createStudentDto);
    return createdStudent.save();
  }

  // 2. READ: Barcha talabalarni topish
  async findAll(): Promise<Student[]> {
    // Guruh nomini ham avtomatik yuklash uchun .populate('groupId') dan foydalanamiz
    return this.studentModel.find().populate('groupId').exec(); 
  }

  // 3. READ: ID bo'yicha yagona talabani topish
  async findOne(id: string): Promise<Student> {
    const student = await this.studentModel.findById(id).populate('groupId').exec();
    if (!student) {
      throw new NotFoundException(`Student with ID "${id}" not found`);
    }
    return student;
  }
  
  // 4. UPDATE: Talaba ma'lumotlarini yangilash
  async update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
    const updatedStudent = await this.studentModel.findByIdAndUpdate(
      id,
      { $set: updateStudentDto },
      { new: true, runValidators: true }, 
    ).populate('groupId').exec();

    if (!updatedStudent) {
        throw new NotFoundException(`Student with ID "${id}" not found for update`);
    }

    return updatedStudent;
  }

  // 5. DELETE: Talabani o'chirish
  async remove(id: string): Promise<Student> {
    const deletedStudent = await this.studentModel.findByIdAndDelete(id).exec();
    if (!deletedStudent) {
        throw new NotFoundException(`Student with ID "${id}" not found for deletion`);
    }
    return deletedStudent;
  }
}