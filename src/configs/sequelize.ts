import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { Role } from '../models/Role.js';
import { User } from '../models/User.js';
import { UserRole } from '../models/UserRole.js'

dotenv.config();

const sequelize = new Sequelize({
    database: process.env.DATABASE_NAME,
    dialect: 'mysql',
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    models: [Role, User, UserRole],
});

export default sequelize;
