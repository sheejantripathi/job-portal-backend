import express, {Request, Response, NextFunction} from 'express';

//import data source for typeorm connection
import 'reflect-metadata';
import { AppDataSource } from './dataSource.js';

//import morgan for logging and http errors for error handling
import morgan from 'morgan';
import { HttpError } from 'http-errors';

//import routes
import jobRoutes from './routes/jobRoutes.js';
import guestJobRoutes from './routes/guestJobsRoutes.js';
import  organizationRoutes from './routes/organizationRoutes.js';
import candidateRoutes from './routes/candidateRoutes.js';

//import error handler middleware
import { errorHandler } from './middlewares/errorHandler.js';

//setup for environment variable in env file
import * as dotenv from 'dotenv';
dotenv.config();


AppDataSource.initialize()
    .then(() => {
        const app = express();
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.get('/', (req: Request, res: Response) => {
            res.send('Hello World');
        });

        app.use(morgan('dev'));

        //routes for job, organization and guest job
        app.use('/api/jobs', jobRoutes);
        app.use('/api/organizations', organizationRoutes);
        app.use('/api/guestJobs', guestJobRoutes);
        app.use('/api/candidate', candidateRoutes)

        //error handling middleware
        app.use(errorHandler);

        //express server port setup
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch((error:any) => console.log('Error during Data Source initialization', error));
