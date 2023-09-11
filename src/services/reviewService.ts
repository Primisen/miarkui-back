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
                    rating: request.body.subject.rating,
                    categoryId: await this.findOrCreateCategory(request.body.subject.category.name),
                },
                userId: request.body.userId,
                text: request.body.text,
                coverImageUrl: request.body.coverImageUrl,
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
                    name: request.body.tags[i].name,
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

    async getById(id: number) {
        return await Review.findOne({
            include: [
                {
                    model: Comment,
                },
                {
                    model: Subject,
                    include: [
                        {
                            model: Category,
                        },
                    ],
                },
                {
                    model: Tag,
                    attributes: ["name"],
                }
            ],
            where: { id },
        });
    }

    async deleteById(id: number) {
        await TagReview.destroy({
            where: {
                reviewId: id,
            },
        });

        return Review.destroy({
            where: {
                id: id,
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
