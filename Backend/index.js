import express from 'express'
import mongoose from 'mongoose';
import dotenv from "dotenv"
import connectDB from '../Backend/db/index.js'
import { error } from 'console';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
const app = express();
const PORT = process.env.PORT || 5000;

// for provided some securities to the website
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true,
}))


//  import the env data
dotenv.config({
    path : './env'
})

// some extra feature to allow the website

app.use(express.json({limit:"40kb"}))
app.use(express.urlencoded({extended: true , limit:"40kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(bodyParser.json());





// connect to the mongodb
connectDB().then(() => {
    console.log("MongoDB connection Successfully At main index.js🎊🎊");
}).catch((error) => {
    console.log(error ,"MongoDB connection field");
})


//Routes import

import userRouter from './routes/user.js';
import serviceProviderRouter from './routes/serviceProvider.js'
import AdminRouter from './routes/admin.js'
import Address from './routes/address.js'
import Otp from './routes/otp.js'
import Service from './routes/service.js'
import Query from './routes/queryemail.js'
import Payment from './routes/payment.js'
import Booking from './routes/booking.js'
import Review from './routes/review.js'


// routers declaration
app.use("/users",userRouter);
app.use("/serviceprovider",serviceProviderRouter)
app.use("/admin",AdminRouter);
app.use("/address",Address);
app.use("/otp",Otp);
app.use("/service",Service);
app.use("/query",Query);
app.use("/payment",Payment);
app.use("/booking",Booking);
app.use("/review",Review);


app.get('/', (req, res) => {
    res.send('Wedding Arrangements Back is runnng!');
  });
  
//   application can be run at server
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });