import * as mongoose from "mongoose";

interface UserDocument {
    username: string;
    passwordHash: string;
}

const userSchema = new mongoose.Schema<{
    username: string;
    passwordHash: string;
}>({
    username: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
});

const User = mongoose.model<UserDocument>("User", userSchema);

export { User };
