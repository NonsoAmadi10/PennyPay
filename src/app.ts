import express, { Express} from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import {auth, wallet} from './routes';

config();

const app: Express = express();

app.use(express.json());

auth(app);
wallet(app);

const mongoUrl: any = process.env.DB_URL;
mongoose.connect(mongoUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}, () => {
  console.log('mongodb database connection established...')
} )

export default app;