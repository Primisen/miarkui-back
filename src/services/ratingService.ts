import { Request } from 'express';
import { Rating } from '../models/rating.js';

class RatingService {
    async create(request: Request) {
        const rating = new Rating({
            userId: request.body.userId,
            subjectId: request.body.subjectId,
            score: request.body.score,
        });
        return rating;
    }

    async get(request: Request) {
        return Rating.findAll({
            where: {
                subjectId: request.body.subjectId,
            },
        });
    }
}

export default new RatingService();
