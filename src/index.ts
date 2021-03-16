import app from './app'
import { config } from 'dotenv';
config();

const port: String | Number = process.env.PORT || 3000;


app.listen(port, () => console.log(`Server is Running on port ${port}...`))