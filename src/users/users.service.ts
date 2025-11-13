// src/users/users.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs'; 

// 🚨 Eslatma: Ushbu importlar ishlashi uchun:
// 1. DTO fayllari (create-user.dto.ts, update-user.dto.ts) mavjud bo'lishi kerak.
// 2. Entity fayli (user.entity.ts) mavjud bo'lishi kerak.
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity'; 

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  // 1. CREATE: Yangi foydalanuvchi yaratish (Parolni xashlaydi)
  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    
    return createdUser.save();
  }

  // 2. READ: Barcha foydalanuvchilarni topish (Parolsiz)
  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-password').exec(); 
  }

  // 3. READ: ID bo'yicha yagona foydalanuvchini topish (Parolsiz)
  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).select('-password').exec();
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }
  
  // 4. READ (Login uchun): Email bo'yicha topish
  // ✅ Tur tuzatilgan: Foydalanuvchi topilmasa null qaytarishi mumkin
  async findByEmail(email: string): Promise<User | null> { 
    // Parol ham kerak bo'lgani uchun .select('+password') dan foydalanamiz
    const user = await this.userModel.findOne({ email }).select('+password').exec();
    return user;
  }
  
  // 5. FIND OR CREATE (OAuth uchun): Foydalanuvchini topish yoki yaratish
  async findOrCreate(userData: Partial<User>): Promise<User> {
      // 🚨 Agar email bo'lmasa, uni yaratish yoki topish mantiqan xato (TS18048 xatosi shu yerda tuzatilgan)
      if (!userData.email) {
          throw new Error("Email is required for findOrCreate operation.");
      }
      
      let user = await this.userModel.findOne({ email: userData.email }).exec();
  
      if (user) {
          return user; 
      }
  
      // Yangi user yaratish
      const defaultUsername = userData.email.split('@')[0];
      
      const newUser = new this.userModel({
          username: userData.username || defaultUsername,
          email: userData.email,
          role: userData.role || 'operator', 
      });
      
      return newUser.save();
  }

  // 6. UPDATE: Foydalanuvchi ma'lumotlarini yangilash
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // Agar yangilashda parol berilsa, uni xashlaymiz
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

  // 7. DELETE: Foydalanuvchini o'chirish
  async remove(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).select('-password').exec();
    if (!deletedUser) {
        throw new NotFoundException(`User with ID "${id}" not found for deletion`);
    }
    return deletedUser;
  }
}