import { AppDataSource } from "../dataSource.js";
import { Job } from "../entity/Job.entity.js";

interface JobType {
    id?: number;
    title: string;
    description: string;
    salaryRange: string;
    isGuest: boolean;
}

export class JobService {
    async createJob(job: JobType): Promise<Job>{
        console.log(job);
        const jobRepository = AppDataSource.getRepository(Job);
        const newJob  =  jobRepository.create(job);
        return await jobRepository.save(newJob);
    }

    async getJob(id: number): Promise<Job>{
        const jobRepository = AppDataSource.getRepository(Job);
        const job =  await jobRepository.findOneBy({id});
        if(!job) {
            throw new Error('Job not found');
        }
        return job;
    }

    async getJobs(): Promise<Job[]>{
        const jobRepository = AppDataSource.getRepository(Job);
        return await jobRepository.find();
    }

    async updateJob(id: number, updateData: any): Promise<Job>{
        const jobRepository = AppDataSource.getRepository(Job);

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
        const jobRepository = AppDataSource.getRepository(Job);
        await jobRepository.delete(id);
    }
}