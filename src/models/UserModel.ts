import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import AutoIncrement from 'mongoose-auto-increment';

export interface User extends mongoose.Document{
    id: number;
    login: string;
    password: string;
}

/**
 * Schema model user
 */
let UserModel = new Schema({
    id: {
        type: Schema.Types.Number,
        required: true,
        unique: true,
        min: 1
    },
    login: {
        type: Schema.Types.String, required: true
    },
    password: {
        type: Schema.Types.String, required: true
    }
});

AutoIncrement.initialize(mongoose.connection);
UserModel.plugin(AutoIncrement.plugin, {
    model: "letter",
    field: "id",
    startAt: 1,
});

const userModel = mongoose.model<User>("user", UserModel, "user");

export default userModel;