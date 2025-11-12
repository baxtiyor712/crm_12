// src/students/entities/student.entity.ts

import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

// ✅ Sinfga umumiy izoh qo'shildi
@ObjectType({ description: '✅ CRM Tizimidagi O‘quvchilarning asosiy ma’lumot modeli' })
@Entity('students')
export class Student {

  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'O‘quvchining unikal ID raqami' }) // ✅ ID uchun izoh
  id: number;

  @Field({ description: 'O‘quvchining to‘liq ismi' }) // ✅ fullName uchun izoh
  @Column()
  fullName: string;

  @Field({ description: 'O‘quvchining telefon raqami' }) // ✅ phone uchun izoh
  @Column()
  phone: string;

  @Field({ description: 'O‘qiyotgan yo‘nalishi yoki fani' }) // ✅ direction uchun izoh
  @Column()
  direction: string;

  @Field({ description: 'Ota-ona (yoki vasiy)ning ismi' }) // ✅ parentName uchun izoh
  @Column()
  parentName: string;

  @Field({ description: 'Ota-ona (yoki vasiy)ning telefon raqami' }) // ✅ parentPhone uchun izoh
  @Column()
  parentPhone: string;

  @Field({ nullable: true, description: 'O‘quvchi rasmi uchun URL manzil (ixtiyoriy)' }) // ✅ photo uchun izoh
  @Column({ nullable: true })
  photo?: string;

  @Column({ nullable: true })
  userId: string; // userId: Bu maydonni GraphQL sxemasiga chiqarmaymiz

  @Field({ description: 'O‘quv markaziga qo‘shilgan sana' }) // ✅ joinedAt uchun izoh
  @CreateDateColumn({ type: 'timestamp' })
  joinedAt: Date;

  @Field({ nullable: true, description: 'O‘quv markazidan ketgan sana (agar bo‘lsa)' }) // ✅ leftAt uchun izoh
  @Column({ type: 'timestamp', nullable: true })
  leftAt?: Date;
}