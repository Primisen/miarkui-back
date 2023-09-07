import { Router } from 'express';
import CommentController from '../controllers/commentController.js'

export const commentRouter = Router();

commentRouter.post('/comments', CommentController.create);
