import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from "path";
import { StudentsModule } from './students/students.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "./students/entities/student.entity";
import { GroupsModule } from './groups/groups.module';
import { Group } from "./groups/entities/group.entity";
import { PaysModule } from './pays/pays.module';
import { Pay } from "./pays/entities/pay.entity";
import { InquiryModule } from './inquiry/inquiry.module';
import { Inquiry } from "./inquiry/entities/inquiry.entity";
import { ChartModule } from './chart/chart.module';
import { Chart } from "./chart/entities/chart.entity";
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { AttendanceModule } from './attendance/attendance.module';
import { BotModule } from "./bot/bot.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),

    TypeOrmModule.forRoot({
      type: "postgres",
      username: "postgres",
      host: "localhost",
      port: 5432,
      password: "1111",
      database: "crm",
      entities: [Student, Group, Pay, Inquiry, Chart],
      synchronize: true,
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/crm.graphql'),
    }),

    StudentsModule,
    GroupsModule,
    PaysModule,
    InquiryModule,
    ChartModule,
    BotModule,

    AuthModule,
    UsersModule,
    AttendanceModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
