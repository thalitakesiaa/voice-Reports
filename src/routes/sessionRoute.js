import { Router } from 'express';
import emailInUse from '../middlewares/emailInUse';
import limitRequests from '../middlewares/limitRequests';
import validate from '../middlewares/validate';
import { loginRules } from '../models/User';
import SessionController from '../controllers/SessionController';

const router = Router();

router.post('/', limitRequests.heavily, validate(loginRules), emailInUse, SessionController.login);
router.post('/resetPassword', SessionController.resetPassword);

export default { router, name: '/login' };
