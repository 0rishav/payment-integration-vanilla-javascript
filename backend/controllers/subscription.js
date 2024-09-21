import ContentModel from "../models/contentModal.js";
import Payment from "../models/paymentModal.js";
import { CatchAsyncError } from "../utils/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const createContent = CatchAsyncError(async (req, res, next) => {
    try {
      const { title, description, type, content } = req.body;
  
      const newContent = await ContentModel.create({
        title,
        description,
        type,
        content,
      });
  
      res.status(201).json({
        success: true,
        message: "Content created successfully",
        data: newContent,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  });

  export const getContentBasedOnSubscription = CatchAsyncError(async (req, res, next) => {
    
    try {
      const { id } = req.params;
  
      const paymentData = await Payment.findOne({ razorpay_payment_id:id, paymentStatus: "Paid" });
  
      if (!paymentData) {
        return next(new ErrorHandler("No payment found.", 404));
      }
  
      const subscriptionPlan = paymentData.subscriptionPlan;
  
      const contentData = await ContentModel.find({ type: subscriptionPlan });
  
      res.status(200).json({
        success: true,
        data: contentData,
      });
    } catch (error) {
      console.log("Error occurred:", error);
      return next(new ErrorHandler(error.message, 500));
    }
  });
  
  