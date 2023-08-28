import { Request, Response } from 'express';
import SubjectService from '../services/subjectService.js';

class SubjectController {
    async create(request: Request, response: Response) {
        SubjectService.create(request)
            .then((subject) => {
                response.status(200).send(subject);
            })
            .catch((error) => {
                response.status(400).send(error);
            });
    }

    async getAll(request: Request, response: Response) {
        SubjectService.getAll()
            .then((subjects) => {
                response.status(200).send(subjects);
            })
            .catch((error) => {
                response.status(400).send(error);
            });
    }
}

export default new SubjectController();
