import companyController from '@controller/companyController';
import { Router } from 'express';

const companyRouter = Router();


companyRouter.get('/', companyController.listAllCompanies);
companyRouter.get('/:id', companyController.getCompanyById);
companyRouter.post('/', companyController.createCompany);
companyRouter.put('/', companyController.updateCompany);


export default companyRouter;
