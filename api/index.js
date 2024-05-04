import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';

import dotenv from 'dotenv';
dotenv.config();

mongoose.connect("mongodb+srv://mark:mark@kariuki-estate.utqja4d.mongodb.net/kariuki-estate?retryWrites=true&w=majority&appName=kariuki-estate").then(() => {
    console.log("connected to mongodb");
}).catch((err) => {
    console.log(err);
})

const app = express();

app.use(express.json());

app.listen(3000,(req,res) => {
    console.log('listening on port 3000');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
    const statusCode= err.statusCode || 500;
    const message= err.message ||'internal server error';
    return res.status(statusCode).json({
        success: false, 
        statusCode,
        message
    })
});
