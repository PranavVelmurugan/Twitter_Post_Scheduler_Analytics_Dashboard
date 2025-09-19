import DotEnv from "dotenv";

DotEnv.config();


export const config = {
    SERVER_CONFIG: {
        LISTEN_PORT: 7000,
    },
    MONGO_DB: {
        USER_NAME: process.env.APP_USER_NAME,
        PASSWORD: process.env.APP_PASSWORD,
        CLUSTER_NAME: process.env.APP_CLUSTER_NAME,
        CLUSTER_ID: process.env.APP_CLUSTER_ID,
        DB_NAME: process.env.APP_DB_NAME
    },
    JWT : {
        SECRET_KEY : process.env.JWT_SECRET
    },
    TWITTER_API : {
        APP_KEY: process.env.TWITTER_API_KEY,
        APP_SECRET_KEY : process.env.TWITTER_API_SECRET,
        ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN,
        ACCESS_SECRET: process.env.TWITTER_ACCESS_SECRET,
        AUTHORIZATION: process.env.Bearer_Token,
        CLIENT_ID: process.env.CLIENT_ID,
        CLIENT_SECERT: process.env.CLIENT_SECERT
    }
};