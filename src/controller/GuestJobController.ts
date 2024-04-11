import { Request, Response } from "express";
import { GuestJobService } from "../service/GuestJobService.js";

export class GuestJobController {
    private GuestJobService = new GuestJobService();

    async createJob(req: Request, res: Response) {
        try {
            const job = await this.GuestJobService.createJob(req.body);
            res.status(201).json(job);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getJob(req: Request, res: Response) {
        try {
            console.log(req.params, 'params')
            const { id } = req.params;

            const organization = await this.GuestJobService.getJob(id);
            res.status(200).json(organization);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getJobs(req: Request, res: Response) {
        try {
            const organizations = await this.GuestJobService.getJobs();
            res.status(200).json(organizations);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateJob(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const organization = await this.GuestJobService.updateJob(id, updateData);
            res.status(201).json(organization);

        }catch(error: any){
            res.status(500).json({ message: error.message });
        }
    }

    async deleteJob(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.GuestJobService.deleteJob(parseInt(id, 10));
            res.status(204).end();
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}