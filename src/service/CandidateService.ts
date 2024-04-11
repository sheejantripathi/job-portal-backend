import { Repository } from "typeorm";
import { AppDataSource } from "../dataSource";
import { User } from "../entity/candidateInfo/User.entity.js";

export class CandidateService {
    private candidateRepository : Repository<User>;

    constructor() {
        this.candidateRepository = AppDataSource.getRepository(User);
    }

    async CreateCandidate(candidate: User): Promise<User> {
        const newCandidate =  this.candidateRepository.create(candidate);
        return await this.candidateRepository.save(newCandidate);
    }

    async getCandidate(id: number): Promise<User> {
        const candidate =  await this.candidateRepository.findOneBy({id});
        if(!candidate) {
            throw new Error('Candidate not found');
        }
        return candidate;
    }

    async getCandidates(): Promise<User[]> {
        return await this.candidateRepository.find();
    }

    async updateCandidate(id: number, updateData: any): Promise<User> {

        let candidate = await this.candidateRepository.findOneBy({ id });
        if (!candidate) {
            throw new Error('Candidate not found');
        }

        // Update the candidate entity with new data
        const updatedCandidate = this.candidateRepository.merge(candidate, updateData);

        // Save the updated entity
        await this.candidateRepository.save(updatedCandidate);

        return updatedCandidate;
    }

    async deleteCandidate(id: number): Promise<void> {
        await this.candidateRepository.delete(id);
    }
}
