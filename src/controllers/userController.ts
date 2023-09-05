import { Request, Response } from 'express';
import UserService from '../services/userService.js';

class UserController {
    async create(request: Request, response: Response) {
        UserService.create(request)
            .then((user) => {
                response.status(200).send(user);
            })
            .catch((error) => {
                response.status(500).send(error);
            });
    }

    async getAllReviews(request: Request, response: Response) {
        UserService.getAllReviews(Number(request.params.id))
            .then((reviews) => {
                response.status(200).send(reviews);
            })
            .catch((error) => {
                response.status(500).send(error);
            });
    }
}

export default new UserController();
