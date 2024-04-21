import {Request, Response, NextFunction} from 'express';
import {CandidateService} from '../service/CandidateService.js';

export class CandidateInfoController {
    private candidateService = new CandidateService();

    async createCandidateInfo(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.body, 'body')
            const {email, password} = req.body;
            if (!email || !password) {
                throw new Error('Email and password are required');
            }
            const candidate = await this.candidateService.CreateCandidate(req.body);
            res.status(201).json(candidate);
        } catch (error: any) {
            next(error)
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
            const candidateInfoUpdated = await this.candidateService.updateCandidate(parseInt(id, 10), req.body)
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

    async candidateLogin(req: Request, res: Response) {
        try {
            const {email, password} = req.body;
            const candidate = await this.candidateService.authenticateCandidate(email, password);
            res.status(200).json(candidate)
        } catch (error: any) {
            res.status(500).json({message: error.message})
        }
    }
}