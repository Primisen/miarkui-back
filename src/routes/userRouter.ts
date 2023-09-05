import { Router } from 'express';
import UserController from '../controllers/userController.js';
import SignInController from '../controllers/signInController.js'

export const userRouter = Router();

userRouter.post('/registration', UserController.create);
userRouter.post('/login', SignInController.signIn);
userRouter.get('/users/:id/reviews', UserController.getAllReviews)
