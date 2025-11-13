// src/bot/bot.update.ts

import { Update, Start, Ctx, Hears, On, Action } from "nestjs-telegraf";
import { Context, Markup } from "telegraf";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ConfigService } from "@nestjs/config";
import { Inquiry, InquiryDocument } from "./model/bot.schema";

// ✅ Faqat 2 bosqichli murojaat holatini saqlash uchun tur
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
    // 🟢 ASOSIY BUYRUQLAR VA MENU
    // ------------------------------------------------------------------

    // Buyruq: /start
    @Start()
    async onStart(@Ctx() ctx: Context) {
        await ctx.reply(
            "🌟 Xush kelibsiz! CRM xizmatlariga murojaat qilish uchun quyidagilarni tanlang:",
            Markup.keyboard([
                ["📝 Yangi murojaat qoldirish", "ℹ️ Markaz Haqida"],
                ["📞 Biz bilan bog'lanish"],
            ]).resize(),
        );
    }

    // Hears: "ℹ️ Markaz Haqida"
    @Hears("ℹ️ Markaz Haqida")
    async onAboutUs(@Ctx() ctx: Context) {
        const aboutText =
            "📚 Biz haqimizda ma'lumot:\n\n" +
            "Kompaniyamiz **Zamonaviy CRM Yechimlari**ni taqdim etuvchi o'quv markazidir.\n" +
            "Bizning asosiy maqsadimiz — IT sohasidagi yosh mutaxassislarni tayyorlash.\n\n" +
            "⚡️ **Afzalliklarimiz:**\n" +
            "• Amaliyotga yo'naltirilgan dasturlar\n" +
            "• Tajribali mentorlar\n" +
            "• Bepul Wi-Fi va qulay o'quv xonalari\n\n" +
            "Qo'shimcha ma'lumot uchun aloqaga chiqing!";

        await ctx.reply(aboutText, { parse_mode: 'Markdown' });
    }

    // Hears: "📞 Biz bilan bog'lanish"
    @Hears("📞 Biz bilan bog'lanish")
    async onContact(@Ctx() ctx: Context) {
        await ctx.reply(
            "📞 Biz bilan bog'lanish:\n\n" +
            "Operator: +998 99 016 85 02 (Baxtiyor)\n" +
            "Telegram: @Rr_baxtiyor"
        );
    }

    // Hears: "📝 Yangi murojaat qoldirish"
    @Hears("📝 Yangi murojaat qoldirish")
    async onNewInquiry(@Ctx() ctx: Context) {
        this.pending.set(ctx.chat!.id, { step: 1, data: {} });
        await ctx.reply("🧑‍💻 To'liq ism-sharifingizni kiriting:");
    }

    // ------------------------------------------------------------------
    // 💬 MATN KIRITISHNI BOSHQARISH (Murojaat Formasi)
    // ------------------------------------------------------------------
    @On("text")
    async onText(@Ctx() ctx: Context) {
        const chatId = ctx.chat?.id;
        const text = (ctx.message as any)?.text as string;
        if (!chatId || !text) return;

        // Agar murojaat jarayoni boshlanmagan bo'lsa, chiqib ketish
        if (!this.pending.has(chatId)) return;

        const state = this.pending.get(chatId)!;

        // 🟢 1-BOSQICH: Ismni qabul qilish
        if (state.step === 1) {
            state.data.studentName = text.trim();
            state.step = 2; // Keyingi (oxirgi) bosqich
            await ctx.reply("📲 Aloqa uchun telefon raqamingizni kiriting:");
            return;
        }

        // 🟢 2-BOSQICH: Telefon raqamni qabul qilish VA YAKUNLASH
        if (state.step === 2) {
            const phone = await this.normalizePhone(text.trim());
            if (!phone) {
                await ctx.reply("🚫 Telefon raqam noto'g'ri. Iltimos, raqamlarni to'g'ri formatda kiriting:");
                return;
            }

            state.data.phoneNumber = phone;

            // Murojaatni MongoDB'ga saqlash
            const inquiry = await this.inquiryModel.create({
                studentName: state.data.studentName!,
                phoneNumber: state.data.phoneNumber!,
                status: "new",
            });

            this.pending.delete(chatId); // Holatni tozalash

            await ctx.reply("✅ Tabriklaymiz! Murojaatingiz qabul qilindi. Tez orada siz bilan bog'lanamiz.");
            await this.notifyAdmin(ctx, inquiry);
        }
    }

    // ------------------------------------------------------------------
    // ⚙️ INLINE TUGMALARNI QABUL QILISH (ADMIN UCHUN)
    // ------------------------------------------------------------------

    // ---- telefon raqamni ko‘rsatish ----
    @Action(/showphone_(.+)/)
    async onShowPhone(@Ctx() ctx: Context) {
        const match = (ctx as any).match as RegExpExecArray;
        const id = match[1];

        const inquiry = await this.inquiryModel.findById(id);
        if (!inquiry) {
            await ctx.reply("❌ Murojaat topilmadi");
            return;
        }

        await ctx.reply(`📲 Telefon raqami: ${inquiry.phoneNumber}`);
    }


    // ---- murojaatni yopish ----
    @Action(/close_(.+)/)
    async onClose(@Ctx() ctx: Context) {
        const match = (ctx as any).match as RegExpExecArray;
        const id = match[1];

        await this.inquiryModel.findByIdAndUpdate(id, { status: 'closed' });

        await ctx.editMessageReplyMarkup(undefined);

        await ctx.reply(`🗑 Murojaat yopildi va arxivga o'tkazildi. (${id})`);
    }


    // ------------------------------------------------------------------
    // 🛠 YORDAMCHI FUNKSIYALAR
    // ------------------------------------------------------------------

    private async normalizePhone(phone: string): Promise<string | null> {
        phone = phone.trim();

        // Formatlar: 998991234567, +998991234567, 991234567
        if (/^998\d{9}$/.test(phone)) {
            return `+${phone}`;
        }

        if (/^\+998\d{9}$/.test(phone)) {
            return phone;
        }

        if (/^\d{9}$/.test(phone)) {
            return `+998${phone}`;
        }

        return null; // Noto'g'ri format
    }


    private async notifyAdmin(ctx: Context, inquiry: InquiryDocument) {
        // .env dan ADMIN_CHAT_ID ni o'qish
        const adminId = Number(this.config.get<string>("ADMIN_CHAT_ID"));

        const phone = await this.normalizePhone(inquiry.phoneNumber);

        if (!phone) {
            // Bu xato deyarli sodir bo'lmaydi, chunki yuqorida tekshirilgan
            await ctx.reply("❌ Telefon raqami noto'g'ri formatda!");
            return;
        }

        const text =
            `🔔 YANGI QIZIQISH MAVJUD!\n\n` +
            `🧑‍💻 Ism: ${inquiry.studentName}\n` +
            `📞 Kontakt: [${phone}](tel:${phone.replace("+", "")})\n` + // Kontakt raqamga o'tish linki bilan
            `✍️ Izoh: ${inquiry.note || "— Izoh koldirilmadi"}`;

        await ctx.telegram.sendMessage(adminId, text, {
            parse_mode: "Markdown", // Matnni formatlash uchun
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "✅ Hal qilindi / Yopish", callback_data: `close_${inquiry._id}` },
                    ],
                ],
            },
        });
    }
}