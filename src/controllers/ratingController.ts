import { Request, Response } from 'express';
import RatingService from '../services/ratingService.js'

class RatingController {
  async create(request: Request, response: Response) {
    RatingService.create(request)
      .then((rating) => {
        response.status(200).send(rating);
      })
      .catch((error) => {
        response.status(400).send(error);
      });
  }

  async get(request: Request, response: Response) {
    RatingService.get(request)
      .then((rating) => {
        response.status(200).send(rating);
      })
      .catch((error) => {
        response.status(400).send(error);
      });
  }
}

export default new RatingController();
