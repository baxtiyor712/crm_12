// src/auth/auth.controller.ts

import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

// ✅ Ushbu Controller barcha /auth/ so‘rovlarini qabul qiladi
@Controller('auth')
export class AuthController {
    // ✅ AuthService'ni (login mantig‘i) kiritish uchun konstruktor
    constructor(private authService: AuthService) { }

    // ------------------------------------------------------------------
    // 🌐 GOOGLE AUTENTIFIKATSIYASI (Google Auth)
    // ------------------------------------------------------------------

    // ✅ GET /auth/google manziliga kirish
    @Get('google')
    // ✅ Foydalanuvchini Google'ga yo‘naltirish uchun 'google' strategiyasini ishlatadi
    @UseGuards(AuthGuard('google')) 
    async googleAuth(@Request() req) {
        // Bu funksiya shunchaki foydalanuvchini Google'ga yo‘naltiradi. 
        // Hech qanday kod talab qilinmaydi, chunki Passport barchasini boshqaradi.
    }

    // ✅ GET /auth/google/callback manziliga qaytish (Google'dan muvaffaqiyatli autentifikatsiyadan so‘ng)
    @Get('google/callback')
    // ✅ Bu yerda ham 'google' strategiyasi ishlatiladi, natija avtomatik req.user ga yoziladi
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Request() req) {
        // ✅ AuthService orqali foydalanuvchini ro‘yxatdan o‘tkazish/login qilish va JWT tokenini qaytarish
        return this.authService.login(req.user);
    }

    // ------------------------------------------------------------------
    // 🐙 GITHUB AUTENTIFIKATSIYASI (GitHub Auth)
    // ------------------------------------------------------------------

    // ✅ GET /auth/github manziliga kirish
    @Get('github')
    // ✅ Foydalanuvchini GitHub'ga yo‘naltirish uchun 'github' strategiyasini ishlatadi
    @UseGuards(AuthGuard('github'))
    async githubAuth(@Request() req) {
        // Shunchaki GitHub'ga yo‘naltirish.
    }

    // ✅ GET /auth/github/callback manziliga qaytish (GitHub'dan muvaffaqiyatli autentifikatsiyadan so‘ng)
    @Get('github/callback')
    // ✅ 'github' strategiyasi ishlatiladi, natija avtomatik req.user ga yoziladi
    @UseGuards(AuthGuard('github'))
    async githubAuthRedirect(@Request() req) {
        // ✅ AuthService orqali foydalanuvchini ro‘yxatdan o‘tkazish/login qilish va JWT tokenini qaytarish
        return this.authService.login(req.user);
    }
}