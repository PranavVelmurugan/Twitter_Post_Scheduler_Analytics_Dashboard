import { validateTweetPayload } from "../middleware/tweets.js";
import { upload } from "../middleware/upload.js";
import { mongoDbInstance } from "../utlils/db.js";
import tweets from "./tweets.js";

const { Router } = require("express");
const router = Router()


mongoDbInstance()
router.use("/tweets", upload.single('media'), tweets)



export default router;