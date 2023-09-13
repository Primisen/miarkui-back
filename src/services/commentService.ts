import { Request } from 'express';
import { Comment } from '../models/comment.js';
import OpenSearch from '../opensearch/openSearch.js'
import { openSearchIndexName } from '../constants/openSearchIndexName.js'

class CommentService {
    async create(request: Request) {
        const comment = new Comment({
            userId: request.body.user.id,
            reviewId: request.body.reviewId,
            text: request.body.text,
        });

        const savedComment= await comment.save();
        await OpenSearch.getClient().index({
            index: openSearchIndexName,
            body: savedComment,
        });

        return savedComment
    }
}

export default new CommentService();
