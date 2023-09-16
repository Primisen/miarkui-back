import { Request, Response } from 'express'
import LikesService from '../services/likesService.js'

class LikesController {

  async create(request: Request, response: Response) {
    LikesService.create(request)
      .then((like) => {
        response.status(200).send(like);
      })
      .catch((error) => {
        response.status(400).send(error);
      });
  }
}

export default new LikesController()