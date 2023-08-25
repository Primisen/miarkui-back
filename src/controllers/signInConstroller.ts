import { Request, Response } from 'express';
import SignInService from '../services/signInService.js';

class SignInController {
  async signIn(request: Request, response: Response) {
    SignInService.signIn(request)
      .then((token) => {
        response.status(200).send(token);
      })
      .catch((error) => {
        response.status(400).send(error);
      });
  }
}

export default new SignInController();
