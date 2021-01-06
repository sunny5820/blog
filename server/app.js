import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';

//Routes
import postRoutes from './routes/api/post';
import userRoutes from './routes/api/user';
import authRoutes from './routes/api/auth';


import morgan from "morgan";

const app = express();
const {MONGO_URI} = config;

//배포 환경때 설정해도 되지만....서버의 보안적인 측면은 보완해주는 해주는 라이브러리
app.use(hpp());
app.use(helmet());

app.use(cors({origin:true, credentials:true})); //cors브라우저가 다른 도메인이나 포트가 다른 싱글페이지 애플리케이션은 서버에서 설정해준다. 허락하는 주소 
app.use(morgan("dev")); //morgan 개발할때 로그 볼수있게 한다.

app.use(express.json()); //bodyparser가 express 서버에 내장되어있다.


mongoose
    .connect(MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true,
    })
    .then(()=>console.log("MongoDB connectiong Success!!"))
    .catch((e)=>console.log(e));


//Use routes
app.get('/');
app.use('/api/post', postRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);



export default app;