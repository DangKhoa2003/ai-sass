import { Schema, model, models } from 'mongoose';
import { boolean } from 'zod';

const UserSchema = new Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    photo: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    planId: {
        type: Number,
        default: 1,
    },
    creditBalance: {
        type: Number,
        default: 20,
    },
    isPro: {
        type: Boolean,
        default: false,
    },
    isPremium: {
        type: Boolean,
        default: false,
    },
});

const User = models?.User || model('User', UserSchema);

export default User;
