// src/index.ts or src/app.ts
import 'reflect-metadata';
import { AppDataSource } from './dataSource.js';
import express, {Request, Response} from 'express';
import jobRoutes from './routes/jobRoutes';
import guestJobRoutes from './routes/guestJobsRoutes';
import  organizationRoutes from './routes/organizationRoutes.js';

AppDataSource.initialize()
    .then(() => {
        const app = express();
        app.use(express.json());

        app.get('/', (req: Request, res: Response) => {
            res.send('Hello World');
        });

        app.use('/api/jobs', jobRoutes);
        app.use('/api/organizations', organizationRoutes);
        app.use('/api/guestJobs', guestJobRoutes);

        app.listen(3000, () => console.log('Server running on http://localhost:3000'));
    })
    .catch((error:any) => console.log('Error during Data Source initialization', error));
