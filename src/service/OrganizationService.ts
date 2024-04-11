import { Repository } from "typeorm";
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
    private organizationRepository!: Repository<Organization>;

    contructor() {
        this.organizationRepository = AppDataSource.getRepository(Organization);
    }
    async createOrganization(organization: OrganizationType): Promise<Organization>{
        const newOrganization  =  this.organizationRepository.create(organization);
        return await this.organizationRepository.save(newOrganization);
    }

    async getOrganization(id: number): Promise<Organization>{
        const organization =  await this.organizationRepository.findOneBy({id});
        if(!organization) {
            throw new Error('Organization not found');
        }
        return organization;
    }

    async getOrganizations(): Promise<Organization[]>{
        return await this.organizationRepository.find();
    }

    async updateOrganization(id: number, updateData: any): Promise<Organization>{

        let organization = await this.organizationRepository.findOneBy({ id });
        if (!organization) {
            throw new Error('Organization not found');
        }

       // Update the organization entity with new data
        const updatedOrganization = this.organizationRepository.merge(organization, updateData);

        // Save the updated entity
        await this.organizationRepository.save(updatedOrganization);

        return updatedOrganization;
    }

    async deleteOrganization(id: number): Promise<void>{
        await this.organizationRepository.delete(id);
    }
}