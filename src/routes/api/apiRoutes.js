import {Router} from 'express';
import userRoutes from './userRoutes/userRoutes';
import adminRoutes from './adminRoutes/adminRoutes';
import animalRoutes from './animalRoutes/animalRoutes';

const router = Router();

router.use('/users', userRoutes)
router.use('/animals', animalRoutes)
router.use('/admins', adminRoutes)

export default router;