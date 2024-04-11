import { Repository } from "typeorm";
import { AppDataSource } from "../dataSource.js";
import { GuestJob } from "../entity/Guestjob.entity.js";

interface GuestOrganizationDetailsType {
    name: string;
    phone?: string;
    email: string;
    postalAddress?: string;
    website: string;
}

interface GuestJobType {
    id?: string;
    title: string;
    description: string;
    salaryRange: string;
    organizationDetails: GuestOrganizationDetailsType;
}

export class GuestJobService {
    private guestJobRepository : Repository<GuestJob>;

    constructor() {
        this.guestJobRepository = AppDataSource.getRepository(GuestJob);
    }
    async createJob(job: GuestJobType): Promise<GuestJob>{
        const newJob  =  this.guestJobRepository.create(job);
        return await this.guestJobRepository.save(newJob);
    }

    async getJob(id: string): Promise<GuestJob>{
        const job =  await  this.guestJobRepository.findOneBy({id});
        if(!job) {
            throw new Error('Job is not available');
        }
        return job;
    }

    async getJobs(): Promise<GuestJob[]>{
        return await  this.guestJobRepository.find();
    }

    async updateJob(id: string, updateData: any): Promise<GuestJob>{

        let job = await  this.guestJobRepository.findOneBy({ id });
        if (!job) {
            throw new Error('Job not found');
        }

       // Update the job entity with new data
        const updatedOrganization =  this.guestJobRepository .merge(job, updateData);

        // Save the updated entity
        await  this.guestJobRepository.save(updatedOrganization);

        return updatedOrganization;
    }

    async deleteJob(id: string): Promise<void>{
        await  this.guestJobRepository.delete(id);
    }
}