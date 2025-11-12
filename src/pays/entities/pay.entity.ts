// src/pays/entities/pay.entity.ts

import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// ✅ Sinfga umumiy izoh qo'shildi
@ObjectType({ description: '✅ O‘quvchilardan qabul qilingan to‘lovlar haqidagi ma’lumot modeli' })
@Entity('pays') // Agar ma'lumotlar bazasida 'pays' nomli jadval bo'lsa
export class Pay {
  
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'To‘lov yozuvining unikal ID raqami' }) // ✅ ID uchun izoh
  id: number;

  @Field({ description: 'To‘lov qilgan o‘quvchining ismi' }) // ✅ studentName uchun izoh
  @Column()
  studentName: string;

  @Field({ description: 'To‘lov qilingan yo‘nalish (fan)' }) // ✅ direction uchun izoh
  @Column()
  direction: string;

  @Field({ description: 'O‘quvchining (yoki to‘lovchining) telefon raqami' }) // ✅ phoneNumber uchun izoh
  @Column()
  phoneNumber: string;

  @Field({ description: 'To‘lov qabul qilingan o‘qituvchi/guruh nomi' }) // ✅ teacherName uchun izoh
  @Column()
  teacherName: string;

  @Field({ description: 'To‘lov amalga oshirilgan sana' }) // ✅ paymentDate uchun izoh
  @Column()
  paymentDate: Date;
}