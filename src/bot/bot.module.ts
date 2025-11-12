import { Module } from "@nestjs/common";
import { TelegrafModule } from "nestjs-telegraf";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Inquiry, InquirySchema } from "./model/bot.schema";
import { BotUpdate } from "./bot.service";

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Inquiry.name, schema: InquirySchema }]),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const token = config.get<string>("BOT_TOKEN");
        if (!token) throw new Error("BOT_TOKEN is not defined");
        return { token };
      },
    }),
  ],
  providers: [BotUpdate],
})
export class BotModule { }
