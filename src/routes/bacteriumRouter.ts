import upload from '@config/multer';
import bacteriumController from '@controller/bacteriumController';
import { Router } from 'express';

const bacteriumRouter = Router();


bacteriumRouter.get('/', bacteriumController.listAllBacteria);
bacteriumRouter.get('/:id', bacteriumController.getBacteriumById);
bacteriumRouter.post('/', upload.single('file'), bacteriumController.createBacterium);
bacteriumRouter.put('/', upload.single('file'), bacteriumController.updateBacterium);


export default bacteriumRouter;
