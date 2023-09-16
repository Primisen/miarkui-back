import { Request } from 'express';
import { Likes } from '../models/likes.js';

class LikesService {
    async create(request: Request) {
        const like = new Likes({
            userId: request.body.userId,
            reviewId: request.body.reviewId,
        });

        if (
            (await Likes.findOne({
                where: {
                    userId: request.body.userId,
                    reviewId: request.body.reviewId,
                },
            })) == null
        ) {
            await like.save();
        } else {
            await Likes.destroy({
                where: {
                    userId: request.body.userId,
                    reviewId: request.body.reviewId,
                },
            });
        }

        return like
    }
}

export default new LikesService();
