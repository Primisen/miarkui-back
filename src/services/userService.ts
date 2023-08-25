import { Request } from 'express';
import { User } from '../models/User.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { UserRole } from '../models/UserRole.js';

dotenv.config();

class UserService {
    async create(request: Request) {
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
}

export default new UserService();
