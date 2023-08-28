import { Router } from 'express';
import ReviewController from '../controllers/reviewController.js'
import reviewController from '../controllers/reviewController.js'

export const reviewRouter = Router();

reviewRouter.post('/reviews', ReviewController.create);
reviewRouter.get('/reviews', reviewController.getAll);

