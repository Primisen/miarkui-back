import { Request } from 'express';
import { Review } from '../models/review.js';
import { Subject } from '../models/subject.js'
import { Category } from '../models/category.js'

class ReviewService {
    async create(request: Request) {
        const review = new Review({
            title: request.body.title,
            // subjectId: request.body.subjectId,
            subject: {
                name: request.body.subject.name,
                // category: await Category.findOrCreate({
                //     where: {
                //         name: request.body.subject.category.name
                //     }
                // })
                // category: {
                //     name: request.body.subject.category.name,
                // },
                categoryId: await this.findOrCreateCategory(request.body.subject.category.name)
                // categoryId: 2
            },
            userId: request.body.userId,
            text: request.body.text,
        },
          {
              include: [{
                  model: Subject,
                  // include: [{
                  //     model: Category,
                  // }]
              }]
          });
        return review.save();
    }

    async getAll() {
        return Review.findAll();
    }

    private async findOrCreateCategory(categoryName: string) {
        const [category, created] = await Category.findOrCreate({
                where: {
                    name: categoryName
                }
            })
        console.log("id: " + category.id);
        return category.id
    }
}

export default new ReviewService();
