import express from 'express';
import { default as mongoose } from "mongoose";
import type { Request, Response } from "express";

import { config } from "./config/index.js";
import routes from "./routes/index.js";

const app = express();
app.use(express.json());

app.use("/api", (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
},routes)


const port = config.SERVER_CONFIG.LISTEN_PORT || 7000

const serverInit = () => {
  app.listen(port, () => {
    console.log(`Server Listening at http://localHost:${port}`)
  })
}

serverInit();

interface Callback {
  (arg0: object): void
}
app.use((req: Request, res: Response, next: Callback) => {
  const error = new Error('Api EndPoint Not Found') as Error & { status?: number };
  error.status = 404;
  next(error);
});


app.use((err: Record<string, any>, req: Request, res: Response) => {
  console.error(`[ERROR] ${err.message}`);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});


process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed");
  process.exit(0);
});

process.on('unhandleRejection',(error)=>{
    console.error("Unhandle rejection:",error);
    process.exit(1)
})

process.on('uncaughtException',(error)=>{
    console.error("Uncaught Exception:",error)
    process.exit(1)
})