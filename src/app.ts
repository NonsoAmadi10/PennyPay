import express, { Express} from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';

config();

const app: Express = express()

const mongoUrl: any = process.env.DB_URL;
mongoose.connect(mongoUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true 
}, () => {
  console.log('mongodb database connection established...')
} )

export default app;