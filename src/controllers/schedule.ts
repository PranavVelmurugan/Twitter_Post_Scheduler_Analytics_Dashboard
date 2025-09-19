import cronJob from "node-cron";
import ScheduleTweet from "../models/schedule.js";
import postTweet from "./post.js";

cronJob.schedule('*****', async () => {
    console.log("[CRONJOB] checking for to schedule Tweet...!!!");
    const timeNow = new Date();
    const scheduledTweet = await ScheduleTweet.find({
        posted: false,
        scheduleAt: { $lte: timeNow }
    });

    scheduledTweet.forEach(async (tweet): Promise<void> => {
        try {
            const mediaObj: object = {
                media_id: tweet?.media?.mediaId
            }
            const payload = { text: tweet.text, mediaObj }
            await postTweet(payload)
            tweet.posted = true;
            await tweet.save();
            console.log(`[CRON] Tweet posted: ${tweet.text}`);
        } catch (error) {
            console.log(`[CRON] Failed to post tweet: ${tweet._id}`, error)
        }
    })
})