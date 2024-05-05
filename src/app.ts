import express, {Request, Response, NextFunction} from 'express';

//cors setup
import cors from 'cors';

//import data source for typeorm connection
import 'reflect-metadata';
import { AppDataSource } from './dataSource.js';

//import morgan for logging and http errors for error handling
import morgan from 'morgan';

import session from 'express-session';

//import routes
import jobRoutes from './routes/jobRoutes.js';
import guestJobRoutes from './routes/guestJobsRoutes.js';
import  organizationRoutes from './routes/organizationRoutes.js';
import candidateRoutes from './routes/candidateRoutes.js';
import authRequestRoutes from './routes/authRequestRoutes.js';
import authRouters from './routes/oauth.js';

//import joivalidation schemas
import { candidateSchema } from './utils/joi-schema/candidate.js';

//import error handler middleware
import { errorHandler } from './middlewares/errorHandler.js';

//import joi validation middleware
import validateJoiSchema from './middlewares/joiValidate.js';

//setup for environment variable in env file
import * as dotenv from 'dotenv';
dotenv.config();


AppDataSource.initialize()
    .then(() => {
        const app = express();

        // Enable All CORS Requests for development, adjust the settings in production
        // CORS configuration
        const corsOptions = {
            origin: 'http://localhost:3000', // Allow only this origin to make requests with credentials
            credentials: true, // Allow credentials (cookies, authentication)
            optionsSuccessStatus: 200 // Some legacy browsers choke on 204
        };
        app.use(cors(corsOptions));

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.get('/', (req: Request, res: Response) => {
            res.send('Hello World');
        });

        app.use(morgan('dev'));

        //use session
        app.use(session({
            secret: 'secret',
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? false : true
            }
        }))

        //routes for job, organization and guest job
        app.use('/api/auth', authRequestRoutes);
        app.use('/oauth', authRouters);
        app.use('/api/jobs', jobRoutes);
        app.use('/api/organizations', organizationRoutes);
        app.use('/api/guestJobs', guestJobRoutes);
        app.use('/api/candidate', validateJoiSchema(candidateSchema), candidateRoutes)

        //error handling middleware
        app.use(errorHandler);

        //express server port setup
        const PORT = process.env.PORT || 5001;
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch((error:any) => console.log('Error during Data Source initialization', error));
