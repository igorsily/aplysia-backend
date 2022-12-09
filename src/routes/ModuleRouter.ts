import ModuleController from '@controller/ModuleController';
import { Router } from 'express';

const moduleRouter = Router();


moduleRouter.get('/', ModuleController.listAllModules);
moduleRouter.get('/:id', ModuleController.getModuleById);
moduleRouter.post('/', ModuleController.createModule);
moduleRouter.put('/', ModuleController.updateModule);


export default moduleRouter;
