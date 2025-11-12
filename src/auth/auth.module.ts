// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module'; // ✅ Foydalanuvchilarni DB dan olish uchun kerak
import { AuthController } from './auth.controller'; // ✅ HTTP so'rovlarini boshqaradi
import { GoogleStrategy } from './auth-google.strategy'; // ✅ Google orqali kirish
import { GithubStrategy } from './auth-github.strategy'; // ✅ GitHub orqali kirish

// ✅ Auth modulining asosiy konfiguratsiyasi
@Module({
  imports: [
    // ✅ Passport.js'ni sozlash. Agar so'rovda strategiya ko'rsatilmasa, 'jwt' ishlatiladi.
    PassportModule.register({ defaultStrategy: 'jwt' }), 
    
    // ✅ JWT tokenlarini yaratish va tasdiqlash uchun modulni sozlash
    JwtModule.registerAsync({
      // ✅ Konfiguratsiya (config) servisidan maxfiy kalitni (JWT_SECRET) oladi
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Maxfiy kalit
        signOptions: { expiresIn: '1h' }, // Token 1 soatda amal qilish muddatini yo'qotadi
      }),
      inject: [ConfigService], // configService'ni inyeksiya qilish
    }),
    
    // ✅ Autentifikatsiya uchun foydalanuvchilar ma'lumotini olish uchun
    UsersModule, 
  ],
  // ✅ /auth/... manzilidagi so'rovlarni boshqaradi
  controllers: [AuthController], 
  
  // ✅ Modulga xizmatlarni (Services) va strategiyalarni kiritish
  providers: [
    AuthService,      // Asosiy login/logout mantig'i
    JwtStrategy,      // JWT tokenlarini tasdiqlash strategiyasi
    GoogleStrategy,   // Google orqali kirish strategiyasi
    GithubStrategy    // GitHub orqali kirish strategiyasi
  ],
  // ✅ JWTService'ni boshqa modullarda ishlata olish uchun eksport qilish
  exports: [AuthService, JwtModule], 
})
export class AuthModule { }