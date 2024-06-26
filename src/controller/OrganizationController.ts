import { Request, Response } from "express";
import { OrganizationService } from "../service/OrganizationService.js";
import { parse } from "path";

export class OrganizationController {
    private organizationService = new OrganizationService();

    async createOrganization(req: Request, res: Response) {
        try {
            const organization = await this.organizationService.createOrganization(req.body);
            res.status(201).json(organization);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getOrganization(req: Request, res: Response) {
        try {
            console.log(req.params, 'params')
            const { id } = req.params;

            const organization = await this.organizationService.getOrganization(parseInt(id, 10));
            res.status(200).json(organization);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getOrganizations(req: Request, res: Response) {
        try {
            const organizations = await this.organizationService.getOrganizations();
            res.status(200).json(organizations);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateOrganization(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const organization = await this.organizationService.updateOrganization(parseInt(id, 10), updateData);
            res.status(201).json(organization);

        }catch(error: any){
            res.status(500).json({ message: error.message });
        }
    }

    async deleteOrganization(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.organizationService.deleteOrganization(parseInt(id, 10));
            res.status(204).end();
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}