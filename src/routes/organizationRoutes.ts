import {Router} from 'express';	
import {OrganizationController} from '../controller/OrganizationController';

const router = Router();
const organizationController = new OrganizationController();

router.post("/", organizationController.createOrganization.bind(organizationController));
router.get("/", organizationController.getOrganizations.bind(organizationController));
router.put("/", organizationController.updateOrganization.bind(organizationController));
router.delete("/", organizationController.deleteOrganization.bind(organizationController));


export default router;