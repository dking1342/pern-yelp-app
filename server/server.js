import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.listen(PORT,()=>console.log('server listening'));