import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DATABSE_NAME,
  dialect: 'mysql',
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  models: [__dirname + '/models'],
});