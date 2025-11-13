// src/students/dto/create-student.dto.ts

import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsOptional, IsDateString, IsMongoId, IsIn } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  // Telefon raqam formati +998XX...
  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string; // Sana string formatida keladi, MongoDB uni Date ga o'tkazadi

  @IsOptional()
  @IsMongoId() // Bu maydon MongoDB ObjectId bo'lishi kerak
  groupId?: string; 

  @IsOptional()
  @IsString()
  @IsIn(['to\'langan', 'qarzdor', 'yangi'])
  paymentStatus?: 'to\'langan' | 'qarzdor' | 'yangi';
}