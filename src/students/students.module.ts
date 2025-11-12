// src/students/students.module.ts

import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsResolver } from './students.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './entities/student.entity';

@Module({
  imports: [
    // MongoDB Schema'ni import qilish
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  providers: [
    StudentsResolver, // GraphQL so'rovlarini boshqaradi
    StudentsService,  // Biznes mantig'ini boshqaradi
  ],
  // Boshqa modullar/bot uchun Service'ni eksport qilish
  exports: [StudentsService], 
})
export class StudentsModule {}