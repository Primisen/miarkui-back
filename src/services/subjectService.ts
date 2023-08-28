import { Request } from 'express';
import { Subject } from '../models/subject.js';

class SubjectService {
    async create(request: Request) {
        const subject = new Subject({
            name: request.body.name,
            categoryId: request.body.categoryId,
        });
        await subject.save();
        return subject;
    }

    async getAll() {
        return Subject.findAll();
    }
}

export default new SubjectService();
