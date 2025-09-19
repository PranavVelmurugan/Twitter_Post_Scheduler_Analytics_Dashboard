import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    twitterId: { required: true, type: String },
    token: { required: true, type: String },
    timeZone: { required: true, type: Number }
})

export default mongoose.model("UserSchema", userSchema)