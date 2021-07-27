import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import restaurantRouter from './routes/restaurantsRoutes.js';
import reviewRouter from './routes/reviewsRoutes.js';
import listRouter from './routes/restListRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.use('/api/v1',restaurantRouter);
app.use('/api/v1/reviews',reviewRouter);
app.use('/api/v1/list',listRouter);


app.listen(PORT,()=>console.log('server listening'));