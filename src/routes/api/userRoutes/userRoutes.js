import {Router} from 'express';
import userController from '../../../controllers/userController';

const router = Router();

router.post('/create',userController.CreateUser);
router.get('/',userController.retrieveUser);
router.get('/:id',userController.findUser);
router.patch('/:id',userController.updateUser);
router.delete('/:id',userController.deleteUser);

export default router