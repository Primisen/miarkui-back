import { Request, Response } from 'express';
import CommentService from '../services/commentService.js'

class CommentController {
  async create(request: Request, response: Response) {
    CommentService.create(request)
      .then((comment) => {
        response.status(200).send(comment);
      })
      .catch((error) => {
        response.status(400).send(error);
      });
  }
}

export default new CommentController();
