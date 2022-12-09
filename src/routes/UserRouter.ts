import UserController from '@controller/UserController';
import { Router } from 'express';

const userRouter = Router();


userRouter.get('/', UserController.listAllUsers);
userRouter.get('/:id', UserController.getUserById);
userRouter.post('/', UserController.createUser);
userRouter.put('/', UserController.updateUser);
// userRouter.post('/password', UserController.alterPassword);

export default userRouter;
