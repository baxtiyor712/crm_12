// src/auth/auth.service.ts

import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt"; // ✅ JWT tokenlarini yaratish uchun kerak
import { UsersService } from "src/users/users.service"; // ✅ Foydalanuvchilarni DB da saqlash va topish uchun

// ✅ AuthService sinfi (login/ro'yxatdan o'tish mantig'ini o'z ichiga oladi)
@Injectable()
export class AuthService {
    constructor(
        // ✅ JwtService'ni inyeksiya qilish
        private jwtService: JwtService, 
        // ✅ UsersService'ni inyeksiya qilish (DB operatsiyalari uchun)
        private usersService: UsersService
    ) { }

    // ✅ Asosiy login mantig'i. Uchinchi tomon (Google/GitHub) strategiyasidan kelgan ma'lumotni qabul qiladi
    async login(user: any) {
        // 1. Kiruvchi ma'lumotlarni tozalash va standartlash
        const userData = {
            email: user.email,
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            name: user.name || "",
            picture: user.picture || "",
            accessToken: user.accessToken, // Ba'zida uchinchi tomon tokeni ham saqlanadi
        };

        // 2. Foydalanuvchini ma'lumotlar bazasida topish yoki yaratish
        // findOrCreate mantig'i UsersService'da bo'ladi.
        const savedUser = await this.usersService.findOrCreate(userData)

        // 3. JWT tokeni uchun payload (ichidagi ma'lumot) yaratish
        const payload = { 
            email: savedUser.email, 
            sub: savedUser.id // sub (subject) maydoni foydalanuvchi ID'sini saqlaydi
        }

        // 4. Client'ga qaytariladigan javobni shakllantirish
        return {
            // ✅ JWT tokenini yaratish va uni acces_token sifatida qaytarish
            acces_token: this.jwtService.sign(payload), 
            user: {
                email: savedUser.email,
                // Foydalanuvchi nomini qaytarish (agar firstName/lastName mavjud bo'lsa, ularni birlashtiradi)
                name: savedUser.name || `${savedUser.firstName} ${savedUser.lastName}`, 
                picture: savedUser.picture,
            }
        }
    }
}