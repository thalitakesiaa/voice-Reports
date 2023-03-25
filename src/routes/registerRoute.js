import { Router } from 'express';
import AdminController from '../controllers/AdminController';
import emailInUse from '../middlewares/emailInUse';
import validateUser from '../middlewares/validateUser';
import roleValidators from '../utils/RoleValidationUtils';
import limitRequests from '../middlewares/limitRequests';

const router = Router();

router.post('/',
    limitRequests.heavily,
    validateUser(roleValidators),
    emailInUse,
    AdminController.create
);

export default { router, name: '/register' };
