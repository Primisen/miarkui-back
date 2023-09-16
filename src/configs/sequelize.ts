import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { Role } from '../models/role.js';
import { User } from '../models/user.js';
import { UserRole } from '../models/userRole.js'
import { Category } from '../models/category.js'
import { Rating } from '../models/rating.js'
import { Subject } from '../models/subject.js'
import { Review } from '../models/review.js'
import { Comment } from '../models/comment.js'
import { Tag } from '../models/tag.js'
import { TagReview } from '../models/tagReview.js'
import { Likes } from '../models/likes.js'

dotenv.config();

const sequelize = new Sequelize({
    database: process.env.DATABASE_NAME,
    dialect: 'mysql',
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    models: [Role, User, UserRole, Category, Rating, Subject, Review, Comment, Tag, TagReview, Likes],
});

export default sequelize;
