import { Router } from 'express';
import MedicalReportController from '../controllers/MedicalReportController';
import limitRequests from '../middlewares/limitRequests';
import verifyToken from '../middlewares/verifyToken';

const router = Router();

router.use(limitRequests.slightly);

router.use(verifyToken);
router.post('/create', MedicalReportController.createReport);
router.get('/', MedicalReportController.geAllReport);
// router.get('/:id', verifyId, MedicalReportController.getById);
// router.put('/alterReport/:id', verifyId, MedicalReportController.alterUser);
// router.put('/activeReport/:id', MedicalReportController.isActive);
// router.delete('/', validateUser(), MedicalReportController.remove);

export default { router, name: '/report' };
