import { readAndWriteClient } from "../utlils/twitterClinet";
interface UpadteObj {
    text?: string,
    media?: {
        media_ids?: [string] | undefined
    }
}
export const updateTweet = async (params: UpadteObj): Promise<Object | undefined> => {
    let result;
    try {
        const response = await readAndWriteClient.v2.tweet(params)
        return ({ message: response })
    } catch (error) {
        console.log("Error in updating", error)
    }
    return result
}