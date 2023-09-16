import { Router } from 'express';
import LikesController from '../controllers/likesController.js'

export const likesRouter = Router();

likesRouter.post('/likes', LikesController.create);
