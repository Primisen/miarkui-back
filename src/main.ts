import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import sequelize from './configs/sequelize.js';
import {userRouter} from './routes/userRouter.js';
import {subjectRouter} from './routes/subjectRouter.js'
import { ratingRouter } from './routes/ratingRouter.js'
import { reviewRouter } from './routes/reviewRouter.js'
import { commentRouter } from './routes/commentRouter.js'
import { categoryRouter } from './routes/categoryRouter.js'

dotenv.config();

const app: Express = express();
const port = process.env.APPLICATION_PORT;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '5mb'}));


// enable corse for all origins
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Expose-Headers", "x-total-count");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");

  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/', userRouter);
app.use('/', subjectRouter);
app.use('/', ratingRouter);
app.use('/', reviewRouter);
app.use('/', commentRouter);
app.use('/', categoryRouter);


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