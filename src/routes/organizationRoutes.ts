import {Router} from 'express';	
import {OrganizationController} from '../controller/OrganizationController.js';

const router = Router();
const organizationController = new OrganizationController();

router.post("/", organizationController.createOrganization.bind(organizationController));
router.get("/:id", organizationController.getOrganization.bind(organizationController));
router.get("/", organizationController.getOrganizations.bind(organizationController));
router.put("/:id", organizationController.updateOrganization.bind(organizationController));
router.delete("/:id", organizationController.deleteOrganization.bind(organizationController));


export default router;