// src/users/entities/user.entity.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// MongoDB/Mongoose tomonidan ishlatiladigan Document interfeysi
export type UserDocument = User & Document;

@Schema({ timestamps: true }) // createdAt va updatedAt avtomatik qo'shiladi
export class User {
  
  // 1. Foydalanuvchi nomi
  @Prop({ required: true, unique: true })
  username: string;

  // 2. Elektron pochta (login uchun)
  @Prop({ required: true, unique: true })
  email: string;

  // 3. Parol (Xashlangan)
  // select: false - bu maydonni findAll yoki findOne kabi standart so'rovlar bilan qaytarmaydi.
  // Bu xavfsizlik uchun muhim. AuthService login paytida uni maxsus chaqiradi.
  @Prop({ required: false, select: false }) 
  password?: string; // OAuth foydalanuvchilarida parol bo'lmasligi mumkin

  // 4. Foydalanuvchi roli
  @Prop({ 
      type: String, 
      enum: ['admin', 'manager', 'operator'], 
      default: 'operator' 
  })
  role: 'admin' | 'manager' | 'operator'; 
    id: any;
    name: string;
    firstName: any;
    lastName: any;
    picture: any;

  // Mongoose tomonidan avtomatik kiritiladigan vaqt tamg'alari
  // Bu maydonlarni MongooseDocument interfeysi orqali olamiz
}

export const UserSchema = SchemaFactory.createForClass(User);