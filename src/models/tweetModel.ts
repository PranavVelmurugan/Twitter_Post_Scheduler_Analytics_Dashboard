import mongoose from "mongoose";

const medaiSchema = new mongoose.Schema({
  filename: String,
  mimetype: String,
  originalname: String,
  path: String,
  mediaId: String
})

const tweetSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 280 },
  media: {
    type: medaiSchema,
    required: false,
    default: {}
  },
  posted: { type: Boolean, default: false }
},
  { timestamps: true }
)

export default mongoose.model("Tweet", tweetSchema)

