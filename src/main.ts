import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {userRouter} from './routes/userRouter.js';
import bodyParser from 'body-parser';
import sequelize from './configs/sequelize.js';

dotenv.config();

const app: Express = express();
const port = process.env.APPLICATION_PORT;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '5mb'}));

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/', userRouter);

const start = async (): Promise<void> => {
  try {
    await sequelize.sync();
  } catch (error) {
    console.error(error);
  }
};

void start();


app.listen(port, () => {
  console.log(`⚡️[server]: Server started on port ${port}`);
});