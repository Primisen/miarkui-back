import { Router } from 'express';
import SubjectController from '../controllers/subjectController.js'

export const subjectRouter = Router();

subjectRouter.post('/subjects', SubjectController.create);
subjectRouter.get('/subjects', SubjectController.getAll);

