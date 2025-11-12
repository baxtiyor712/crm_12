import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schema/user.schema";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findOrCreate(userData: Partial<User>): Promise<User> {
        return this.userModel.findOneAndUpdate(
            { email: userData.email },
            { $set: userData },
            { new: true, upsert: true }
        ).exec();
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }
}
