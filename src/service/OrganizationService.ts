import { AppDataSource } from "../dataSource.js";
import { Organization } from "../entity/Organization.entity.js";

interface ContactDetails {
    phone: string;
    email: string;
    postalAddress: string;
    website: string;
}

interface OrganizationType {
    id?: number;
    name: string;
    description: string;
    location: string;
    contactDetails: ContactDetails;

}

export class OrganizationService {
    async createOrganization(organization: OrganizationType): Promise<Organization>{
        console.log(organization);
        const organizationRepository = AppDataSource.getRepository(Organization);
        const newOrganization  =  organizationRepository.create(organization);
        return await organizationRepository.save(newOrganization);
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