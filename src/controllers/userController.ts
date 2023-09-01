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
}

export default new UserController();
