import {Router} from 'express';
import adminController from '../../../controllers/adminController';
import AdminExist from '../../../middlewares/adminExist'

const router = Router();

router.post('/create',AdminExist,adminController.CreateAdmin);
router.post('/login',adminController.LoginAdmin);
router.get('/',adminController.retrieveAdmin);
router.get('/:id',adminController.findAdmin);
router.patch('/:id',adminController.updateAdmin);
router.delete('/:id',adminController.deleteAdmin);

export default router