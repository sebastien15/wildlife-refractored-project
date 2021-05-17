import {Router} from 'express';
import animalController from '../../../controllers/animalController';
import AdminAuthentication from '../../../middlewares/tokenCheck'
const upload = require("../../../middlewares/upload");
const multer = require('multer');
const path = require("path");
const router = Router();

router.post('/',AdminAuthentication,upload.single('fImage'),animalController.CreateAnimal);
// router.post('/',upload.single('fImage'),animalController.CreateAnimal);
router.get('/',animalController.retrieveAnimal);
router.get('/:id',animalController.findAnimal);
router.patch('/:id',AdminAuthentication,upload.single('fImage'),animalController.updateAnimal);
router.delete('/:id',AdminAuthentication,animalController.deleteAnimal);


export default router