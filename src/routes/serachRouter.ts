import { Router } from 'express';
import SearchController from '../controllers/searchController.js'

export const searchRouter = Router();

searchRouter.get('/search', SearchController.search);
