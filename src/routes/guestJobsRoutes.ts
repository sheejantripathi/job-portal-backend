import {Router} from 'express';	
import {GuestJobController} from '../controller/GuestJobController.js';


const router = Router();
const guestJobController = new GuestJobController();

//routes for the jobs with guest organization
router.post("/", guestJobController.createJob.bind(guestJobController));
router.get("/:id", guestJobController.getJob.bind(guestJobController));
router.get("/", guestJobController.getJobs.bind(guestJobController));   
router.put("/:id", guestJobController.updateJob.bind(guestJobController));
router.delete("/:id", guestJobController.deleteJob.bind(guestJobController));

export default router;