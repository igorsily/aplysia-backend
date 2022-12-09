import { logger } from '@config/logger';
import { BadRequestError } from '@error/BadRequestError';
import HttpResponse from '@helpers/httpResponse';
import { CompanyRequestCreate } from '@models/company/CompanyRequestCreate';
import { CompanyRequestList } from '@models/company/CompanyRequestList';
import { CompanyRequestUpdate } from '@models/company/CompanyRequestUpdate';
import CompanyService from '@service/CompanyService';

import { Request, Response } from 'express';

export default new class CompanyController {

    listAllCompanies = async (request: Request, response: Response) => {

        const { filter, pageSize, page } = request.query;

        const limit: number | any = pageSize ? pageSize : 10;
        const offset = page ? (parseInt(page as string) - 1) * limit : 0;

        const companyRequestList: CompanyRequestList = {
            filter: filter ? filter as string : null,
            limit: limit,
            offset: offset
        }

        try {
            const data = await CompanyService.listAllCompanies(companyRequestList);
            return HttpResponse.Send(data, response);
        } catch (error: any) {
            logger.error(`[listAllCompanies] ${error}`);
            return HttpResponse.ServerError(error as string, response);
        }

    }

    createCompany = async (request: Request, response: Response) => {

        const companyRequestCreate: CompanyRequestCreate = request.body;

        try {
            const data = await CompanyService.createCompany(companyRequestCreate)
            return HttpResponse.Created(data, response);
        } catch (error: any) {
            logger.error(`[createBacterium] ${error}`);

            if (error instanceof BadRequestError) {
                return HttpResponse.BadRequest(error.message, response);
            }

            return HttpResponse.ServerError(error as string, response);
        }
    }

    getCompanyById = async (request: Request, response: Response) => {

        const { id } = request.params;

        try {
            const data = await CompanyService.getCompanyById(id);
            return HttpResponse.Send(data, response);
        } catch (error: any) {
            logger.error(`[getBacteriumById] ${error}`);

            if (error instanceof BadRequestError) {
                return HttpResponse.BadRequest(error.message, response);
            }

            return HttpResponse.ServerError(error as string, response);
        }
    }

    updateCompany = async (request: Request, response: Response) => {

        const { id } = request.params;

        const companyRequest: CompanyRequestUpdate = request.body;

        companyRequest.id = id;

        try {
            const data = await CompanyService.updateCompany(companyRequest);
            return HttpResponse.Send(data, response);
        } catch (error: any) {
            logger.error(`[updateBacterium] ${error}`);

            if (error instanceof BadRequestError) {
                return HttpResponse.BadRequest(error.message, response);
            }

            return HttpResponse.ServerError(error as string, response);
        }
    }

    //TODO - Implementar o delete
}