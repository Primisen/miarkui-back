import { Request } from 'express';
import { Comment } from '../models/comment.js'

class CommentService {
  async create(request: Request) {
    const comment = new Comment({
      userId: request.body.userId,
      reviewId: request.body.reviewId,
      text: request.body.text
    });

    console.log("comment: " + comment)
    return comment.save();
  }
}

export default new CommentService();
