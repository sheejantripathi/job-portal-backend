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
    async createJob(job: GuestJobType): Promise<GuestJob>{
        const jobRepository = AppDataSource.getRepository(GuestJob);
        const newJob  =  jobRepository.create(job);
        return await jobRepository.save(newJob);
    }

    async getJob(id: string): Promise<GuestJob>{
        const jobRepository = AppDataSource.getRepository(GuestJob);
        const job =  await jobRepository.findOneBy({id});
        if(!job) {
            throw new Error('Job is not available');
        }
        return job;
    }

    async getJobs(): Promise<GuestJob[]>{
        const jobRepository = AppDataSource.getRepository(GuestJob);
        return await jobRepository.find();
    }

    async updateJob(id: string, updateData: any): Promise<GuestJob>{
        const jobRepository = AppDataSource.getRepository(GuestJob);

        let job = await jobRepository.findOneBy({ id });
        if (!job) {
            throw new Error('Job not found');
        }

       // Update the job entity with new data
        const updatedOrganization = jobRepository.merge(job, updateData);

        // Save the updated entity
        await jobRepository.save(updatedOrganization);

        return updatedOrganization;
    }

    async deleteJob(id: string): Promise<void>{
        const jobRepository = AppDataSource.getRepository(GuestJob);
        await jobRepository.delete(id);
    }
}