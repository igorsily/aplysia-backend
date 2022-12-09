import { logger } from '@config/logger';
import { BadRequestError } from '@error/BadRequestError';
import HttpResponse from '@helpers/httpResponse';
import { DepartmentRequestCreate } from '@models/department/DepartmentRequestCreate';
import { DepartmentRequestList } from '@models/department/DepartmentRequestList';
import { DepartmentRequestUpdate } from '@models/department/DepartmentRequestUpdate';
import DepartmentService from '@service/DepartmentService';

import { Request, Response } from 'express';

export default new class DepartmentController {

    listAllDepartments = async (request: Request, response: Response) => {

        const { companyId, fantasyName, pageSize, page } = request.query;

        const limit: number | any = pageSize ? pageSize : 10;
        const offset = page ? (parseInt(page as string) - 1) * limit : 0;

        const departmentRequestList: DepartmentRequestList = {
            companyId: companyId as string,
            fantasyName: fantasyName as string,
            limit: limit,
            offset: offset
        }

        try {
            const data = await DepartmentService.listAllDepartments(departmentRequestList);
            return HttpResponse.Send(data, response);
        } catch (error: any) {
            logger.error(`[listAllDepartments] ${error}`);
            return HttpResponse.ServerError(error as string, response);
        }

    }

    createDepartment = async (request: Request, response: Response) => {

        const departmentRequestCreate: DepartmentRequestCreate = request.body;

        try {
            const data = await DepartmentService.createDepartment(departmentRequestCreate)
            return HttpResponse.Created(data, response);
        } catch (error: any) {
            logger.error(`[createDepartment] ${error}`);

            if (error instanceof BadRequestError) {
                return HttpResponse.BadRequest(error.message, response);
            }

            return HttpResponse.ServerError(error as string, response);
        }
    }

    getDepartmentById = async (request: Request, response: Response) => {

        const { id } = request.params;

        try {
            const data = await DepartmentService.getDepartmentById(id);
            return HttpResponse.Send(data, response);
        } catch (error: any) {
            logger.error(`[getDepartmentById] ${error}`);

            if (error instanceof BadRequestError) {
                return HttpResponse.BadRequest(error.message, response);
            }

            return HttpResponse.ServerError(error as string, response);
        }
    }

    updateDepartment = async (request: Request, response: Response) => {

        const { id } = request.params;

        const departmentRequest: DepartmentRequestUpdate = request.body;

        departmentRequest.id = id;

        try {
            const data = await DepartmentService.updateDepartment(departmentRequest);
            return HttpResponse.Send(data, response);
        } catch (error: any) {
            logger.error(`[updateDepartment] ${error}`);

            if (error instanceof BadRequestError) {
                return HttpResponse.BadRequest(error.message, response);
            }

            return HttpResponse.ServerError(error as string, response);
        }
    }

    //TODO - Implementar o delete
}