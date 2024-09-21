import express from "express"
import { createPayment, getPaymentDetails, verifyPayment } from "../controllers/payment.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-payment",createPayment);

paymentRouter.post("/verify-payment",verifyPayment);

paymentRouter.get("/payment",getPaymentDetails)

export default paymentRouter