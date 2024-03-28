// src/index.ts or src/app.ts
import 'reflect-metadata';
import { AppDataSource } from './dataSource';
import express from 'express';
import jobRoutes from './routes/jobRoutes';
import  organizationRoutes from './routes/organizationRoutes';

AppDataSource.initialize()
    .then(() => {
        const app = express();
        app.use(express.json());

        app.use('/api/jobs', jobRoutes);
        app.use('/api/organizations', organizationRoutes);

        app.listen(3000, () => console.log('Server running on http://localhost:3000'));
    })
    .catch((error) => console.log('Error during Data Source initialization', error));
