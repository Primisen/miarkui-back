import { Router } from 'express'
import CategoryController from '../controllers/categoryController.js'

export const categoryRouter = Router();

categoryRouter.post('/categories', CategoryController.create);
categoryRouter.get('/categories', CategoryController.getAll);