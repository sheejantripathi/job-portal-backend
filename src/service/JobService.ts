import { Repository } from "typeorm";
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
    private jobRepository: Repository<Job>;

    constructor() {
        this.jobRepository = AppDataSource.getRepository(Job);
    }

    async createJob(job: JobType): Promise<Job>{
        const newJob  =  this.jobRepository.create(job);
        return await this.jobRepository.save(newJob);
    }

    async getJob(id: number): Promise<Job>{
        const job =  await this.jobRepository.findOneBy({id});
        if(!job) {
            throw new Error('Job not found');
        }
        return job;
    }

    async getJobs(): Promise<Job[]>{
        return await this.jobRepository.find();
    }

    async updateJob(id: number, updateData: any): Promise<Job>{

        let job = await this.jobRepository.findOneBy({ id });
        if (!job) {
            throw new Error('Job not found');
        }

       // Update the job entity with new data
        const updatedOrganization = this.jobRepository.merge(job, updateData);

        // Save the updated entity
        await this.jobRepository.save(updatedOrganization);

        return updatedOrganization;
    }

    async deleteJob(id: number): Promise<void>{
        await this.jobRepository.delete(id);
    }
}