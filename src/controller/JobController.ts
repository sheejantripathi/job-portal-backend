import { Request, Response } from "express";
import { JobService } from "../service/JobService.js";

export class JobController {
    private JobService = new JobService();

    async createJob(req: Request, res: Response) {
        try {
            const job = await this.JobService.createJob(req.body);
            res.status(201).json(job);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getJob(req: Request, res: Response) {
        try {
            console.log(req.params, 'params')
            const { id } = req.params;

            const organization = await this.JobService.getJob(parseInt(id, 10));
            res.status(200).json(organization);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getJobs(req: Request, res: Response) {
        try {
            const organizations = await this.JobService.getJobs();
            res.status(200).json(organizations);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateJob(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const organization = await this.JobService.updateJob(parseInt(id, 10), updateData);
            res.status(201).json(organization);

        }catch(error: any){
            res.status(500).json({ message: error.message });
        }
    }

    async deleteJob(req: Request, res: Response) {
        try {
            await this.JobService.deleteJob(req.body);
            res.status(204).end();
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}