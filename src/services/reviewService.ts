import { Request } from 'express';
import { Review } from '../models/review.js';
import { Subject } from '../models/subject.js';
import { Category } from '../models/category.js';
import { TagReview } from '../models/tagReview.js';
import { Tag } from '../models/tag.js';
import { Comment } from '../models/comment.js';
import { User } from '../models/user.js';
import OpenSearch from '../opensearch/openSearch.js';
import { openSearchIndexName } from '../constants/openSearchIndexName.js';
import { Likes } from '../models/likes.js';

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
                        include: [{
                            model:  Category
                        }]
                    },
                ],
            },
        );
        const savedReview = await review.save();

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

        await OpenSearch.getClient().index({
            index: openSearchIndexName,
            body: savedReview,
        });
    }

    async getAll() {
        const reviews = await Review.findAll({
            include: [
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
                },
                {
                    model: Likes,
                },
            ],
        });
        return reviews;
    }

    async getById(id: number) {
        const review = await Review.findOne({
            include: [
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ['username'],
                        },
                    ],
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
                    attributes: ['name'],
                },
                {
                    model: Likes,
                },
                {
                    model: User
                }
            ],
            where: { id },
        });
        return review;
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
