import express from "express"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import connectDB from "./utils/db.js"
import paymentRouter from "./routes/payment.js"
import subscriptionRouter from "./routes/subscription.js"

dotenv.config()


const app = express();
const PORT = process.env.PORT;

app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"))
// const corsOptions = {
//     origin: 'http://localhost:5173',
//     credentials: true, 
//   };
  
app.use(cors());

app.use("/api/v1",paymentRouter);
app.use("/api/v1",subscriptionRouter)


app.get("/test-route", (req,res)=>{
    res.status(200).json({
        success:true,
        message:"API WORKING"
    })
})


app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
  });
  


app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
    connectDB()
})