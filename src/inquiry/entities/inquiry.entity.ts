// src/inquiry/entities/inquiry.entity.ts

import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// ✅ Sinfga umumiy izoh qo'shildi
@ObjectType({ description: '✅ O‘quv markaziga qiziqish bildirgan shaxslarning murojaatlari' })
@Entity('inquiries') // Agar ma'lumotlar bazasida 'inquiries' nomli jadval bo'lsa
export class Inquiry {
  
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Murojaat yozuvining unikal ID raqami' }) // ✅ ID uchun izoh
  id: number;

  @Field({ description: 'Murojaat qilgan shaxsning to‘liq ismi' }) // ✅ studentName uchun izoh
  @Column()
  studentName: string;

  @Field({ description: 'Murojaat qilgan shaxsning telefon raqami' }) // ✅ phoneNumber uchun izoh
  @Column()
  phoneNumber: string;

  @Field({ description: 'Murojaat sababi yoki qo‘shimcha eslatma' }) // ✅ note uchun izoh
  @Column()
  note: string;

  @Field({ description: 'Murojaat qilingan sana va vaqt' }) // ✅ createdAt uchun izoh
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}