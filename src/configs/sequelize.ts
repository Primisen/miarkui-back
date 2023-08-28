import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { Role } from '../models/Role.js';
import { User } from '../models/User.js';
import { UserRole } from '../models/UserRole.js'
import { Category } from '../models/category.js'
import { Rating } from '../models/rating.js'
import { Subject } from '../models/subject.js'
import { Review } from '../models/review.js'
import { Comment } from '../models/comment.js'

dotenv.config();

const sequelize = new Sequelize({
    database: process.env.DATABASE_NAME,
    dialect: 'mysql',
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    models: [Role, User, UserRole, Category, Rating, Subject, Review, Comment],
});

export default sequelize;
