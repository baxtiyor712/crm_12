// src/attendance/entities/attendance.entity.ts

import { ObjectType, Field, ID } from '@nestjs/graphql';

// ✅ Sinfga umumiy izoh qo'shildi
@ObjectType({ description: '✅ Har bir dars uchun olingan davomat ma’lumotlari' })
export class Attendance {
  
  @Field(() => ID, { description: 'Davomat yozuvining unikal identifikatori' }) // ✅ ID uchun izoh
  id: string;

  @Field({ description: 'Davomati olingan o‘quvchining ID raqami' }) // ✅ studentId uchun izoh
  studentId: string;

  @Field({ description: 'Davomat olingan darsning ID raqami (Guruh/Dars IDsi)' }) // ✅ lessonId uchun izoh
  lessonId: string;

  @Field({ description: 'Davomat holati (masalan, "Keldi", "Kelmadi", "Kechikdi")' }) // ✅ status uchun izoh
  status: string;

  @Field({ description: 'Davomat olingan sana' }) // ✅ date uchun izoh
  date: string;
}