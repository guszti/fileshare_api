import * as mongoose from "mongoose";
import { User } from "../../auth/models/User";

interface FileDocument {
    name: string;
    user: typeof User;
    createdAt: Date;
    archivedAt: Date | null;
}

const fileSchema = new mongoose.Schema<FileDocument>({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    archivedAt: {
        type: Date,
    },
});

const File = mongoose.model<FileDocument>("File", fileSchema);

export { File };
