import dotenv from "dotenv";
import app from './app.js';

dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;


app.listen(PORT, ()=>{
    console.log(`App is running on ${PORT}`);
})