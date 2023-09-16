import express, { Express } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import sequelize from './configs/sequelize.js';
import { userRouter } from './routes/userRouter.js';
import { subjectRouter } from './routes/subjectRouter.js';
import { ratingRouter } from './routes/ratingRouter.js';
import { reviewRouter } from './routes/reviewRouter.js';
import { commentRouter } from './routes/commentRouter.js';
import { categoryRouter } from './routes/categoryRouter.js';
import OpenSearch from './opensearch/openSearch.js';
import { searchRouter } from './routes/serachRouter.js';
import { openSearchIndexName } from './constants/openSearchIndexName.js'
import { likesRouter } from './routes/likesRouter.js'

dotenv.config();
const app: Express = express();

createApplicationListener();
await createConnectionToDB();
await createOpenSearchIndex();
configureRoutes()

async function createConnectionToDB() {
    try {
        await sequelize.sync();
    } catch (error) {
        console.error(error);
    }
}

async function createOpenSearchIndex() {
    const name = openSearchIndexName;
    const settings = {
        settings: {
            index: {
                number_of_shards: 4,
                number_of_replicas: 3,
            },
        },
    };

    await OpenSearch.createIndex(name, settings);
}

function createApplicationListener() {
    const port = process.env.APPLICATION_PORT;
    app.listen(port, () => {
        console.log(`⚡️[server]: Server started on port ${port}`);
    });
}

function configureRoutes() {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: '5mb' }));
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Expose-Headers', 'x-total-count');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        next();
    });
    app.use('/', userRouter);
    app.use('/', subjectRouter);
    app.use('/', ratingRouter);
    app.use('/', reviewRouter);
    app.use('/', commentRouter);
    app.use('/', categoryRouter);
    app.use('/', searchRouter);
    app.use('/', likesRouter);
}
