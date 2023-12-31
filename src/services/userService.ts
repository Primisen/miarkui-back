import { Request } from 'express';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { UserRole } from '../models/userRole.js';
import { Review } from '../models/review.js';
import { Subject } from '../models/subject.js';
import { Category } from '../models/category.js';
import { Tag } from '../models/tag.js';
import { Likes } from '../models/likes.js';

dotenv.config();

class UserService {
    async create(request: Request) {
        //horrible method
        if ((await User.findOne({ where: { username: request.body.username } })) != null) {
            return 'User with ' + request.body.username + ' username already exists.';
        }

        if ((await User.findOne({ where: { email: request.body.email } })) != null) {
            return 'User with ' + request.body.email + ' email already exists.';
        }

        const user = new User({
            username: request.body.username,
            email: request.body.email,
            password: bcrypt.hashSync(request.body.password, Number(process.env.SALT_ROUNDS)),
        });

        await user.save();
        const userRole = new UserRole({
            userId: user.id,
            roleId: 2,
        });
        await userRole.save();

        return user;
    }

    getAllReviews(id: number) {
        return Review.findAll({
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
            where: {
                userId: id,
            },
        });
    }
}

export default new UserService();
