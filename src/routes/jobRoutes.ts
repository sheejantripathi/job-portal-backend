import {Router} from 'express';	
import {JobController} from '../controller/JobController.js';

const router = Router();
const jobController = new JobController();

//routes for the jons with registered organization
router.post("/", jobController.createJob.bind(jobController));
router.get("/:id", jobController.getJob.bind(jobController));
router.get("/", jobController.getJobs.bind(jobController));
router.put("/:id", jobController.updateJob.bind(jobController));
router.delete("/:id", jobController.deleteJob.bind(jobController));

export default router;