import mongoose from "mongoose"

const updateTweet = new mongoose.Schema({
  tweetId: mongoose.SchemaTypes.ObjectId,
  text: { type: String }
}, { timestamps: true })

export default mongoose.model("UpdateTweet", updateTweet)