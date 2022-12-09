import AuthMiddleware from '@middlewares/AuthMiddleware';
import authRouter from '@routes/AuthRouter';
import bacteriumRouter from '@routes/bacteriumRouter';
import companyRouter from '@routes/companyRouter';
import moduleRouter from '@routes/ModuleRouter';
import unityRouter from '@routes/UnityRouter';
import userRouter from '@routes/UserRouter';

import { Router } from 'express';

const routes = Router();

routes.get('/', async (_req, resp) => {
  return resp.send({ message: 'Okay' });
});

routes.use('/auth', authRouter);

routes.use(AuthMiddleware.verifyToken)
routes.use('/bacteria', bacteriumRouter);
routes.use('/companies', companyRouter);
routes.use('/modules', moduleRouter)
routes.use('/units', unityRouter)
routes.use('/users', userRouter)

export default routes;
