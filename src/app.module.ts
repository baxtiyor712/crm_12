// src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// Barcha asosiy modullarni import qilish
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module'; 
import { StudentsModule } from './students/students.module';
// ... Boshqa modullar
// import { GroupsModule } from './groups/groups.module';
// import { PaysModule } from './pays/pays.module';
// import { ChartModule } from './chart/chart.module';

@Module({
  imports: [
    // 1. Konfiguratsiya (.env faylini o'qish)
    ConfigModule.forRoot({
      isGlobal: true, // Konfiguratsiyani hamma joyda ishlatish
    }),

    // 2. Ma'lumotlar bazasi ulanishi (MongoDB)
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        // .env dagi MONGO_URI dan olinadi
        uri: configService.get<string>('MONGO_URI'), 
      }),
      inject: [ConfigService],
    }),

    // 3. Modullarni ulash (Users va Students hozircha eng muhim)
    UsersModule,      // POST /users uchun
    AuthModule,
    StudentsModule,   // GraphQL/Students uchun
    // GroupsModule,
    // PaysModule,
    // ChartModule,
    // ...
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}