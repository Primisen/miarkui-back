import { Request } from 'express';
import { Review } from '../models/review.js'

class ReviewService {
  async create(request: Request) {
    const review = new Review({
      name: request.body.name,
      subjectId: request.body.subjectId,
      userId: request.body.userId,
      text: request.body.text
    });
    await review.save();
    return review;
  }

  async getAll() {
    return Review.findAll();
  }
}

export default new ReviewService();
