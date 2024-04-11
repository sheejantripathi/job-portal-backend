import express, {Request, Response} from 'express';

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

//setup for environment variable in env file
import * as dotenv from 'dotenv';
import { NextFunction } from 'connect';
dotenv.config();


AppDataSource.initialize()
    .then(() => {
        const app = express();
        app.use(express.json());

        app.get('/', (req: Request, res: Response) => {
            res.send('Hello World');
        });

        //error handling middleware
        app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
            // The status code is set by the http-errors module or defaults to 500
            res.status(err.status || 500);

            //responiding with the error or a generic message
            res.send({
                message: err.message,
                error: req.app.get('env') === 'development' ? err : {},
            })
        });

        app.use(morgan('dev'));

        //routes for job, organization and guest job
        app.use('/api/jobs', jobRoutes);
        app.use('/api/organizations', organizationRoutes);
        app.use('/api/guestJobs', guestJobRoutes);

        //express server port setup
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch((error:any) => console.log('Error during Data Source initialization', error));
