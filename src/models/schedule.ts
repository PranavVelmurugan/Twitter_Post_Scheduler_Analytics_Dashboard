import { default as mongoose } from "mongoose";

const medaiSchema = new mongoose.Schema({
  filename: String,
  mimetype: String,
  originalname: String,
  path: String,
  mediaId: String
})

const scheduleTweet = new mongoose.Schema({
    text: { type: String, required: true },
    media: {
        type: medaiSchema,
        required: false,
        default: {}
    },
    scheduleAt: { type: Date, required: true },
    posted: { type: Boolean, default: false }
}, {timestamps: true})

export default mongoose.model("ScheduleTweet", scheduleTweet)