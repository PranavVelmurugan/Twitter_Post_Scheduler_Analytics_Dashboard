import { Router, Request, Response } from "express";

import Tweet from "../models/tweetModel.js";
import ScheduleTweet from "../models/schedule.js";

import { readAndWriteClient } from "../utlils/twitterClinet.js";

import postTweet from "../controllers/post.js";
import { updateTweet } from "../controllers/update.js";
import { ObjectId } from 'mongodb';
import { updateJoiSchema, validateScheduleTweetPayload, validateTweetPayload } from "../middleware/tweets.js";

const tweets = Router();

interface MediaData {
    filename: string | undefined,
    mimetype: string | undefined,
    originalname: string | undefined,
    path: string | undefined,
    mediaId: string | undefined
}

interface MediaObj {
    media_ids: [string]
}

tweets.post("/create", validateTweetPayload, async (req: Request, res: Response): Promise<object | undefined> => {
    try {
        const { text } = req.body
        const mediaFile: any = req.file;
        let medaiData: MediaData | undefined;
        let media: MediaObj | undefined
        if (text.length > 280) {
            return res.status(400).json({ error: 'Tweet exceeds 280 characters' });
        }

        if (mediaFile) {
            const mediaPath: any = mediaFile?.path
            const mediaId = await readAndWriteClient.v1.uploadMedia(mediaPath);
            medaiData = {
                filename: mediaFile?.filename,
                mimetype: mediaFile?.mimetype,
                originalname: mediaFile?.originalname,
                path: mediaFile?.path,
                mediaId,
            }
            media = {
                media_ids: [mediaId]
            }
        }
        const tweet = new Tweet({
            text,
            media: medaiData
        })
        const postedReponse = await postTweet({ text: tweet.text, media });
        tweet.posted = true;
        console.log(postedReponse, "Reponse")
        await tweet.save();
        return res.status(201).json({ message: 'Tweet scheduled', tweet });
    } catch (error) {
        res.status(500).json({ message: "Error in create Tweet", error });
    }
})

tweets.post("/schedule", validateScheduleTweetPayload, async (req: Request, res: Response): Promise<object | undefined> => {
    try {
        const { text, scheduleAt } = req.body
        let medaiData: MediaData | undefined;
        const media: any = req.file;
        if (text.length > 280) {
            return res.status(400).json({ error: 'Tweet exceeds 280 characters' });
        }

        if (media) {
            const mediaPath: any = media?.path
            const mediaId = await readAndWriteClient.v1.uploadMedia(mediaPath);
            medaiData = {
                filename: media?.filename,
                mimetype: media?.mimetype,
                originalname: media?.originalname,
                path: media?.path,
                mediaId,
            }
        }

        const tweet = new ScheduleTweet({
            text,
            media: medaiData,
            scheduleAt: new Date(scheduleAt)
        })
        await tweet.save();
        return res.status(201).json({ message: 'Tweet scheduled', tweet });
    } catch (error) {
        res.status(500).json({ message: "Error in create Tweet", error });
    }
})

tweets.put("/update", updateJoiSchema, async (req: Request, res: Response): Promise<Object | undefined> => {
    try {
        const { id, text, scheduledAt } = req.body;
        const media: any = req.file;
        if (text.length > 280) {
            return res.status(400).json({ error: 'Tweet exceeds 280 characters' });
        }

        let updatedTweetFields: Record<string, any> = {}
        let tweetPost: object = {}
        if (text) {
            updatedTweetFields.text = text
            tweetPost = { text }
        }
        if (scheduledAt) updatedTweetFields.scheduledAt = scheduledAt
        if (media) {
            const mediaPath: any = media?.path
            const mediaId = await readAndWriteClient.v1.uploadMedia(mediaPath);
            const medaiData: MediaData = {
                filename: media?.filename,
                mimetype: media?.mimetype,
                originalname: media?.originalname,
                path: media?.path,
                mediaId,
            }
            updatedTweetFields.media = medaiData
            tweetPost = { media: { media_ids: [mediaId] } }
        }

        const result: Record<string, any> = await Tweet.updateOne(
            { _id: new ObjectId(id), status: { $ne: "Posted" } },
            { $set: updatedTweetFields }
        )
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Tweet not found or already posted' });
        } else if (!updatedTweetFields?.scheduledAt) {
            const updatedTweet = await updateTweet(tweetPost)
            res.status(200).json({ message: "Updated Tweet Successfully", updatedTweet })
        }
    } catch (error) {
        return res.status(500).json({ message: "While Upadting Tweet error" })
    }
})

export default tweets;