import mongoose from "mongoose";
import {config} from "../config/index.js";

export const mongoDbInstance = async () => {
    try {
        const dbConnectionUri = `mongodb+srv://${config.MONGO_DB.USER_NAME}:${config.MONGO_DB.PASSWORD}@${config.MONGO_DB.CLUSTER_NAME}.${config.MONGO_DB.CLUSTER_ID}.mongodb.net/${config.MONGO_DB.DB_NAME}?retryWrites=true&w=majority`;
        await mongoose.connect(dbConnectionUri);

        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to the database');
        });

        // const collections = await mongoose.connection.db.listCollections().toArray();

        // collections.forEach(col => {
        //     console.log(col.name, "Collection NAme");
        // });

        mongoose.connection.on('error', (error) => {
            console.error('Mongoose connection error:', error);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('Mongoose disconnected from the database');
        });

        console.log('Database has been connected');

    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};