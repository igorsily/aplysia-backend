import AuthController from '@controller/AuthController';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/login', AuthController.login);



export default authRouter;
