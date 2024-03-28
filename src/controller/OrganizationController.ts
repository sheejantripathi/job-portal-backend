import { Request, Response } from "express";
import { OrganizationService } from "../service/OrganizationService";

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
            	const organization = await this.organizationService.updateOrganization(req.body);
            res.status(201).json(organization);

        }catch(error: any){
            res.status(500).json({ message: error.message });
        }
    }

    async deleteOrganization(req: Request, res: Response) {
        try {
            await this.organizationService.deleteOrganization(req.body);
            res.status(204).end();
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}