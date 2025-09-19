
import { readAndWriteClient } from "../utlils/twitterClinet.js";

interface TweetData {
    text?: string,
    media?: {
        media_ids?: [string] | undefined
    }
}

const postTweet = async (tweetData: TweetData): Promise<object> => {
    try {
        const response = await readAndWriteClient.v2.tweet(tweetData)
        return response;
    } catch (error) {
        console.log("Failed to Post a Tweet", error);
        throw new Error("Tweet Failed")
    }
}

export default postTweet;