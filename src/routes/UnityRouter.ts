import UnityController from '@controller/UnityController';
import { Router } from 'express';

const unityRouter = Router();


unityRouter.get('/', UnityController.listAllUnitys);
unityRouter.get('/:id', UnityController.getUnityById);
unityRouter.post('/', UnityController.createUnity);
unityRouter.put('/', UnityController.updateUnity);


export default unityRouter;
