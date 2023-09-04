import { Request, Response } from 'express'
import CategoryService from '../services/categoryService.js'

class CategoryController {

  async create(request: Request, response: Response) {
    CategoryService.create(request)
      .then((category) => {
        response.status(200).send(category);
      })
      .catch((error) => {
        response.status(400).send(error);
      });
  }

  async getAll(request: Request, response: Response) {
    CategoryService.getAll()
      .then((category) => {
        response.status(200).send(category);
      })
      .catch((error) => {
        response.status(400).send(error);
      });
  }
}

export default new CategoryController()