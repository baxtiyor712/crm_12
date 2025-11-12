// src/bot/bot.update.ts

import { Update, Start, Ctx, Hears, On, Action } from "nestjs-telegraf";
import { Context, Markup } from "telegraf";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ConfigService } from "@nestjs/config";
import { Inquiry, InquiryDocument } from "./model/bot.schema";

// ✅ 2 bosqichli murojaat holatini saqlash uchun tur (hozircha faqat 2 bosqich ishlatiladi)
type Pending = {
    step: 1 | 2; // 1: Ism, 2: Telefon
    data: Partial<Inquiry>;
};

@Update()
export class BotUpdate {
    private pending = new Map<number, Pending>();

    constructor(
        @InjectModel(Inquiry.name) private inquiryModel: Model<InquiryDocument>,
        private config: ConfigService,
    ) { }

    // ------------------------------------------------------------------
    // ⚠️ FUNKSIYALAR BU YERDA BO'LADI (Hozircha bo'sh)
    // ------------------------------------------------------------------
    
    // Masalan:
    // @Start()
    // async onStart(@Ctx() ctx: Context) {
    //    // ...
    // }

    // @On("text")
    // async onText(@Ctx() ctx: Context) {
    //    // ...
    // }
}