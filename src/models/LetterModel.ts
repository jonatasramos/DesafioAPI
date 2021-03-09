import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import AutoIncrement from 'mongoose-auto-increment';

export interface Letter extends mongoose.Document{
    id: number;
    sender_name: string;
    sender_adress: string;
    text: string;
    status: number;
}

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
/**
 * Schema model Letter
 */
let LetterModel = new Schema({
    id: {
        type: Schema.Types.Number,
        required: true,
        unique: true,
        min: 1
    },
    sender_name: {
        type: Schema.Types.String, required: true
    },
    sender_adress: {
        type: Schema.Types.String, required: true
    },
    text: {
        type: Schema.Types.String, required: true
    },
    status: {
        type: Schema.Types.Number, required: true
    }
}, schemaOptions);

AutoIncrement.initialize(mongoose.connection);
LetterModel.plugin(AutoIncrement.plugin, {
    model: "letter",
    field: "id",
    startAt: 1,
});

const letterModel = mongoose.model<Letter>("letter", LetterModel, "letter");

export default letterModel;