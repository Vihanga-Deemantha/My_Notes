import mongoose from "mongoose";

// schema is used to define the structure of the data
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
// export the model
export default User;
