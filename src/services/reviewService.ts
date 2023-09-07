import { Request } from 'express';
import { Review } from '../models/review.js';
import { Subject } from '../models/subject.js';
import { Category } from '../models/category.js';
import { TagReview } from '../models/tagReview.js';
import { Tag } from '../models/tag.js';
import { Comment } from '../models/comment.js';

class ReviewService {
    async create(request: Request) {
        const review = new Review(
            {
                title: request.body.title,
                subject: {
                    name: request.body.subject.name,
                    categoryId: await this.findOrCreateCategory(request.body.subject.category.name),
                },
                userId: request.body.userId,
                text: request.body.text,
                coverImageUrl: request.body.coverImageUrl,
                // tags: request.body.tags,
            },
            {
                include: [
                    {
                        model: Subject,
                    },
                ],
            },
        );
        await review.save();

        for (let i = 0; i < request.body.tags.length; i++) {
            console.log(request.body.tags[i]);
            const [tag, created] = await Tag.findOrCreate({
                where: {
                    name: request.body.tags[i],
                },
            });

            const tagReview = new TagReview({
                tagId: tag.id,
                reviewId: review.id,
            });

            await tagReview.save();
        }
    }

    async getAll() {
        return Review.findAll();
    }

    // getById(id: number) {
    //     return Review.findOne({
    //         where: {
    //             id,
    //         }
    //     });
    // }

    async getById(id: number) {
        const review = await Review.findOne({
            include: [
                {
                    model: Comment,
                    required: false,
                    where: { reviewId: id },
                },
            ],
        });

        return review;
    }

    async deleteById(reviewId: number) {
        await TagReview.destroy({
            where: {
                reviewId,
            },
        });

        return Review.destroy({
            where: {
                id: reviewId,
            },
        });
    }

    getComments(id: number) {
        return Comment.findAll({
            where: {
                reviewId: id,
            },
        });
    }

    private async findOrCreateCategory(categoryName: string) {
        const [category, created] = await Category.findOrCreate({
            where: {
                name: categoryName,
            },
        });
        return category.id;
    }
}

export default new ReviewService();
