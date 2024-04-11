import {Request, Response} from 'express';
import {CandidateService} from '../service/CandidateService.js';

export class CandidateInfoController {
    private candidateService = new CandidateService();

    async createCandidateInfo(req: Request, res: Response) {
        try {
            const candidate = await this.candidateService.CreateCandidate(req.body);
            res.status(201).json(candidate);
        } catch (error: any) {
            res.status(500).json({message: error.message})
        }
    }

    async getCandidateInfo(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const candidateInfo = await this.candidateService.getCandidate(parseInt(id, 10))
            res.status(201).json(candidateInfo)
        } catch (error: any) {
            res.status(500).json({message: error.message})
        }
    }

    async updateCandidateInfo(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const candidateInfoUpdated = await this.candidateService.updateCandidate(parseInt(id, 10))
            res.status(201).json(candidateInfoUpdated) 
        } catch (error: any) {
            res.status(500).json({mesage: error.messagee})
        }
    }

    async deleteCandidateInfo(req: Request, res: Response) {
        try {
            const {id} = req.params;
            await this.candidateService.deleteCandidate(parseInt(id, 10))
            res.status(204).end()
        } catch (error: any) {
            res.status(500).json({message: error.message})
            
        }
    }
}