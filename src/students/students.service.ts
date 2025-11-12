import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
  constructor(@InjectRepository(Student) private studentRepo: Repository<Student>) { }

  async create(createStudentInput: CreateStudentInput, userId: string) {
    const student = this.studentRepo.create({
      ...createStudentInput,
      userId, 
    });
    return await this.studentRepo.save(student);
  }


  findAll() {
    return this.studentRepo.find()
  }

  async findOne(id: number) {
    const student = await this.studentRepo.findOne({ where: { id: +id } })
    if (!student) throw new NotFoundException()
    return student
  }

  async update(id: number, updateStudentInput: UpdateStudentInput) {
    const student = await this.studentRepo.findOne({ where: { id: +id } })
    if (!student) throw new NotFoundException()
    return this.studentRepo.update(id, updateStudentInput)
  }

  async remove(id: number) {
    const student = await this.studentRepo.findOne({ where: { id: +id } })
    if (!student) throw new NotFoundException()
    return this.studentRepo.delete(id)
  }

  async leave(id: number) {
    const student = await this.studentRepo.findOneBy({ id });
    if (!student) throw new NotFoundException()
    if (student.leftAt) throw new BadRequestException()
    student.leftAt = new Date();
    return this.studentRepo.save(student);
  }
}
