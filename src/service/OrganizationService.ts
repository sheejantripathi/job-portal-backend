import { AppDataSource } from "../dataSource";
import { Organization } from "../entity/Organization";

export class OrganizationService {
    async createOrganization(organization: Organization): Promise<Organization>{
        const organizationRepository = AppDataSource.getRepository(Organization);
        return await organizationRepository.save(organization);
    }

    async getOrganizations(): Promise<Organization[]>{
        const organizationRepository = AppDataSource.getRepository(Organization);
        return await organizationRepository.find();
    }

    async updateOrganization(organization: Organization): Promise<Organization>{
        const organizationRepository = AppDataSource.getRepository(Organization);
        return await organizationRepository.save(organization);
    }

    async deleteOrganization(organization: Organization): Promise<void>{
        const organizationRepository = AppDataSource.getRepository(Organization);
        await organizationRepository.remove(organization);
    }
}