import { Request } from 'express';
import { Comment } from '../models/comment.js'

class CommentService {
  async create(request: Request) {
    const comment = new Comment({
      userId: request.body.userId,
      reviewId: request.body.reviewId,
      text: request.body.text
    });
    await comment.save();
    return comment;
  }

  async get(request: Request) {
    return Comment.findAll({
      where: {
        reviewId: request.body.reviewId
      }
    })
  }
}

export default new CommentService();
