import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        profilePic: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;