import { Repository } from "typeorm";
import { AppDataSource } from "../dataSource.js";
import { CandidateProfile } from "../entity/candidateInfo/CandidateProfile.entity.js";
import * as bcrypt from "bcrypt";

export class CandidateService {
    private candidateRepository : Repository<CandidateProfile>;

    constructor() {
        this.candidateRepository = AppDataSource.getRepository(CandidateProfile);
    }

    async CreateCandidate(candidate: CandidateProfile): Promise<CandidateProfile> {
        const newCandidate =  this.candidateRepository.create(candidate);
        return await this.candidateRepository.save(newCandidate);
    }

    async getCandidate(id: number): Promise<CandidateProfile> {
        const candidate =  await this.candidateRepository.findOneBy({id});
        if(!candidate) {
            throw new Error('Candidate not found');
        }
        return candidate;
    }

    async getCandidates(): Promise<CandidateProfile[]> {
        return await this.candidateRepository.find();
    }

    async updateCandidate(id: number, updateData: any): Promise<CandidateProfile> {

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

    async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

    async authenticateCandidate(email: string, password: string): Promise<CandidateProfile> {
        const candidate = await this.candidateRepository.findOneBy({ email });
        if (!candidate) {
            throw new Error('Candidate not found');
        }

        const isPasswordMatched = await this.validatePassword(password, candidate.password);
        if (!isPasswordMatched) {
            throw new Error('Invalid password');
        }
        return candidate;
    }
}
