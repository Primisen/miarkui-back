import { Router } from 'express';
import UserController from '../controllers/userController.js';
import SignInConstroller from '../controllers/signInConstroller.js'

export const userRouter = Router();

userRouter.post('/registration', UserController.create);
userRouter.post('/login', SignInConstroller.signIn);

