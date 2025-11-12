import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";

export type UserDocument = User & Document

@Schema()
export class User extends Model {
    @Prop({ required: true, unique: true })
    email: string

    @Prop()
    firstName: string

    @Prop()
    lastName: string

    @Prop()
    name: string

    @Prop()
    accessToken: string

    @Prop()
    picture: string

    @Prop({ default: Date.now })
    createdAt: Date
}

export const userSchema = SchemaFactory.createForClass(User)