// src/app.module.ts (Tekshirish uchun)

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './users/users.module'; // ✅ 1. Import qilingan
import { AuthModule } from './auth/auth.module'; 
import { StudentsModule } from './students/students.module';
// ... Boshqa modullar

@Module({
  imports: [
    // 1. Konfiguratsiya
    ConfigModule.forRoot({ isGlobal: true }),

    // 2. Ma'lumotlar bazasi ulanishi (Mongoose)
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        // Eslatma: Bu yerda MONGO_URI to'g'ri berilganiga ishonch hosil qiling
        uri: configService.get<string>('MONGO_URI'), 
      }),
      inject: [ConfigService],
    }),

    // 3. Modullarni ulash
    UsersModule,      // 🚨 UsersModule albatta bu yerda bo'lishi kerak
    AuthModule,
    StudentsModule,   
    // ...
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}