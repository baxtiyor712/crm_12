// src/inquiry/schemas/inquiry.schema.ts (yoki shunga o'xshash joylashuv)

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

// ✅ MongoDB Documentining tipini aniqlash
export type InquiryDocument = HydratedDocument<Inquiry>;

// ✅ Mongoose Schemasini aniqlash. timestamps: true qo'shilgan, ya'ni createdAt va updatedAt avtomatik qo'shiladi.
@Schema({ timestamps: true })
export class Inquiry {
  // ✅ Murojaat qilgan shaxsning to'liq ismi (Majburiy maydon)
  @Prop({ required: true })
  studentName: string;

  // ✅ Murojaat qilgan shaxsning telefon raqami (Majburiy maydon)
  @Prop({ required: true })
  phoneNumber: string;

  // ✅ Murojaat sababi yoki qo'shimcha eslatma (Majburiy emas)
  @Prop()
  note?: string;

  // ✅ Murojaatning joriy holati. Standart qiymat "new" (Yangi)
  @Prop({ default: "new", enum: ["new", "closed"] })
  status: "new" | "closed";
}

// ✅ Mongoose sxemasini yaratish
export const InquirySchema = SchemaFactory.createForClass(Inquiry);