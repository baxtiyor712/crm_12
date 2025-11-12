// src/groups/entities/group.entity.ts

import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// ✅ Sinfga umumiy izoh qo'shildi
@ObjectType({ description: '✅ O‘quv markazidagi o‘quv guruhlarining asosiy ma’lumot modeli' })
@Entity('groups') // Agar ma'lumotlar bazasida 'groups' nomli jadval bo'lsa
export class Group {
  
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Guruhning unikal ID raqami' }) // ✅ ID uchun izoh
  id: number;

  @Field({ description: 'Guruhning asosiy fani yoki yo‘nalishi' }) // ✅ subject uchun izoh
  @Column()
  subject: string;

  @Field({ description: 'Dars o‘tiladigan kunlar (masalan, Dush/Chor/Ju)' }) // ✅ days uchun izoh
  @Column()
  days: string;

  @Field({ description: 'Darsning boshlanish va tugash vaqti' }) // ✅ time uchun izoh
  @Column()
  time: string;
  
  @Field({ description: 'Guruh o‘qituvchisining ismi' }) // ✅ teacherName uchun izoh
  @Column()
  teacherName: string;

  @Field({ description: 'O‘qituvchining telefon raqami' }) // ✅ teacherPhone uchun izoh
  @Column()
  teacherPhone: string;

  @Field({ nullable: true, description: 'O‘qituvchi rasmi uchun URL manzil (ixtiyoriy)' }) // ✅ teacherPhoto uchun izoh
  @Column({ nullable: true })
  teacherPhoto?: string;
}