import {Router} from "express";
import api from './api/apiRoutes';
const router = Router();

const url = `/api`
router.use(url,api);

export default router