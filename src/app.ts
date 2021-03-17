import express, { Express} from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import auth from './routes/authRoutes';

config();

const app: Express = express();

app.use(express.json());

auth(app);

const mongoUrl: any = process.env.DB_URL;
mongoose.connect(mongoUrl, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true 
}, () => {
  console.log('mongodb database connection established...')
} )

export default app;