import { Router } from 'express';
import UserController from '../controllers/userController.js';

export const userRouter = Router();

userRouter.post('/registration', UserController.create);
