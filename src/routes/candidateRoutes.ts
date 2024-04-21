import e, {Router} from 'express';	

import {CandidateInfoController} from '../controller/CandidateInfoController.js';

const router = Router();
const candidateInfoController = new CandidateInfoController();

router.post("/", candidateInfoController.createCandidateInfo.bind(candidateInfoController));
router.get("/:id", candidateInfoController.getCandidateInfo.bind(candidateInfoController));
router.put("/:id", candidateInfoController.updateCandidateInfo.bind(candidateInfoController));
router.delete("/:id", candidateInfoController.deleteCandidateInfo.bind(candidateInfoController));
router.post("/login", candidateInfoController.candidateLogin.bind(candidateInfoController))

export default router;