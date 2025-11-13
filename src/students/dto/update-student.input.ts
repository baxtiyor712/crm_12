// src/students/dto/update-student.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.input';

// PartialType barcha maydonlarni ixtiyoriy (optional) qilib qo'yadi.
// Shuning uchun PATCH so'rovida hamma ma'lumotni yuborish shart emas.
export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  id(id: any): string {
    throw new Error('Method not implemented.');
  }
}