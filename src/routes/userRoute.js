import { Router } from 'express';
import UserController from '../controllers/UserController';
import limitRequests from '../middlewares/limitRequests';
import verifyToken from '../middlewares/verifyToken';
import verifyId from '../middlewares/verifyId';
import validateUser from '../middlewares/validateUser';

const router = Router();

router.use(limitRequests.slightly);

router.use(verifyToken);
router.get('/', UserController.getAll);
router.get('/:id', verifyId, UserController.getById);
router.put('/alterUser/:id', verifyId, UserController.alterUser);
router.put('/activeUser/:id', UserController.isActive);
router.delete('/', validateUser(), UserController.remove);

export default { router, name: '/user' };
