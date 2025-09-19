import mongoose from "mongoose";


const analyticsSchema = new mongoose.Schema({
    tweetId: { required: true, type: String },
    impression: { required: true, type: String },
    likes: { required: true, type: Number },
    retweet: { required: true, type: Number }
})

export default mongoose.model("AnalyticModel", analyticsSchema)