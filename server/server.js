import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import restaurantRouter from './routes/restaurantsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.use('/api/v1',restaurantRouter);


app.listen(PORT,()=>console.log('server listening'));