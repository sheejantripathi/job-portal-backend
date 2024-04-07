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

    async getOrganization(id: number): Promise<Organization>{
        const organizationRepository = AppDataSource.getRepository(Organization);
        const organization =  await organizationRepository.findOneBy({id});
        if(!organization) {
            throw new Error('Organization not found');
        }
        return organization;
    }

    async getOrganizations(): Promise<Organization[]>{
        const organizationRepository = AppDataSource.getRepository(Organization);
        return await organizationRepository.find();
    }

    async updateOrganization(id: number, updateData: any): Promise<Organization>{
        const organizationRepository = AppDataSource.getRepository(Organization);

        let organization = await organizationRepository.findOneBy({ id });
        if (!organization) {
            throw new Error('Organization not found');
        }

       // Update the organization entity with new data
        const updatedOrganization = organizationRepository.merge(organization, updateData);

        // Save the updated entity
        await organizationRepository.save(updatedOrganization);

        return updatedOrganization;
    }

    async deleteOrganization(id: number): Promise<void>{
        const organizationRepository = AppDataSource.getRepository(Organization);
        await organizationRepository.delete(id);
    }
}