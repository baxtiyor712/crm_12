// src/users/users.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'; // Parollarni xashlash uchun
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity'; // User Entity/Schema mavjud deb hisoblaymiz

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  // 1. CREATE: Yangi foydalanuvchi yaratish
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Parolni xashlash (hash)
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword, // Xashlangan parolni saqlash
    });
    
    return createdUser.save();
  }

  // 2. READ: Barcha foydalanuvchilarni topish
  async findAll(): Promise<User[]> {
    // Parollarni qaytarishdan saqlanish uchun .select('-password') dan foydalanish tavsiya etiladi
    return this.userModel.find().select('-password').exec(); 
  }

  // 3. READ: ID bo'yicha yagona foydalanuvchini topish
  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).select('-password').exec();
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }
  
  // 4. READ (Login uchun): Username yoki Email bo'yicha topish
  async findByEmail(email: string): Promise<User> {
    // Login paytida parolni ham tekshirish kerak bo'lgani uchun .select('+password') yoki .select() ishlatilishi mumkin
    const user = await this.userModel.findOne({ email }).select('+password').exec();
    return user;
  }

  // 5. UPDATE: Foydalanuvchi ma'lumotlarini yangilash
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // Agar yangilashda parol berilsa, uni xashlash kerak
    if (updateUserDto.password) {
        const salt = await bcrypt.genSalt();
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }
      
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { $set: updateUserDto },
      { new: true, runValidators: true }, 
    ).select('-password').exec();

    if (!updatedUser) {
        throw new NotFoundException(`User with ID "${id}" not found for update`);
    }

    return updatedUser;
  }

  // 6. DELETE: Foydalanuvchini o'chirish
  async remove(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).select('-password').exec();
    if (!deletedUser) {
        throw new NotFoundException(`User with ID "${id}" not found for deletion`);
    }
    return deletedUser;
  }
}