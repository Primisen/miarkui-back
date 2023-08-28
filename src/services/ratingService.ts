import { Request } from 'express';
import { Rating } from '../models/rating.js'

class RatingService {
  async create(request: Request) {
    const rating = new Rating({
      userId: request.body.userId,
      subjectId: request.body.subjectId,
      rating: request.body.rating
    });
    await rating.save();
    return rating;
  }

  async get(request: Request) {
    return Rating.findAll({
      where: {
        subjectId: request.body.subjectId
      }
    })
  }
}

export default new RatingService();
