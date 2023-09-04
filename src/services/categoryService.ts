import { Request } from 'express';
import { Category } from '../models/category.js'

class CategoryService {
    async create(request: Request) {
        const category = new Category({
            name: request.body.name,
        });
        await category.save();
        return category;
    }

    async getAll() {
        return Category.findAll();
    }
}

export default new CategoryService();
