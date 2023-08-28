import { Router } from 'express';
import RatingController from '../controllers/ratingController.js'

export const ratingRouter = Router();

ratingRouter.post('/ratings', RatingController.create);
ratingRouter.get('/ratings', RatingController.get);

