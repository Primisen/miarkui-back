import { Request, Response } from 'express';
import ReviewService from '../services/reviewService.js'

class ReviewController {
  async create(request: Request, response: Response) {
    ReviewService.create(request)
      .then((review) => {
        response.status(200).send(review);
      })
      .catch((error) => {
        response.status(400).send(error);
      });
  }

  async getAll(request: Request, response: Response) {
    ReviewService.getAll()
      .then((review) => {
        response.status(200).send(review);
      })
      .catch((error) => {
        response.status(400).send(error);
      });
  }
}

export default new ReviewController();
