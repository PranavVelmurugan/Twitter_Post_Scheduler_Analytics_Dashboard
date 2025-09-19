import { TwitterApi } from "twitter-api-v2";
import { config } from "../config/index.js";

const twitterCilent = new TwitterApi({
    appKey: config.TWITTER_API?.APP_KEY!,
    appSecret: config.TWITTER_API?.APP_SECRET_KEY!,
    accessToken: config.TWITTER_API?.ACCESS_TOKEN!,
    accessSecret: config.TWITTER_API?.ACCESS_SECRET!,
})

export const readAndWriteClient = twitterCilent.readWrite;