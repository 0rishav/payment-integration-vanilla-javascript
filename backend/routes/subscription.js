import express from 'express';
import { createContent, getContentBasedOnSubscription} from '../controllers/subscription.js';

const subscriptionRouter = express.Router();

subscriptionRouter.post('/create-content', createContent);

subscriptionRouter.get('/content/:id',getContentBasedOnSubscription);




export default subscriptionRouter;
