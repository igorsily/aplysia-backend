import { logger } from '@config/logger';
import { BadRequestError } from '@error/BadRequestError';
import HttpResponse from '@helpers/httpResponse';
import { ModuleRequestCreate } from '@models/module/ModuleRequestCreate';
import { ModuleRequestList } from '@models/module/ModuleRequestList';
import { ModuleRequestUpdate } from '@models/module/ModuleRequestUpdate';
import ModuleService from '@service/ModuleService';

import { Request, Response } from 'express';

export default new class ModuleController {

    listAllModules = async (request: Request, response: Response) => {

        const { filter, pageSize, page } = request.query;

        const limit: number | any = pageSize ? pageSize : 10;
        const offset = page ? (parseInt(page as string) - 1) * limit : 0;

        const moduleRequestList: ModuleRequestList = {
            filter: filter ? filter as string : null,
            limit: limit,
            offset: offset
        }

        try {
            const data = await ModuleService.listAllModules(moduleRequestList);
            return HttpResponse.Send(data, response);
        } catch (error: any) {
            logger.error(`[listAllModules] ${error}`);
            return HttpResponse.ServerError(error as string, response);
        }

    }

    createModule = async (request: Request, response: Response) => {

        const moduleRequestCreate: ModuleRequestCreate = request.body;

        try {
            const data = await ModuleService.createModule(moduleRequestCreate)
            return HttpResponse.Created(data, response);
        } catch (error: any) {
            logger.error(`[createModule] ${error}`);

            if (error instanceof BadRequestError) {
                return HttpResponse.BadRequest(error.message, response);
            }

            return HttpResponse.ServerError(error as string, response);
        }
    }

    getModuleById = async (request: Request, response: Response) => {

        const { id } = request.params;

        try {
            const data = await ModuleService.getModuleById(id);
            return HttpResponse.Send(data, response);
        } catch (error: any) {
            logger.error(`[getModuleById] ${error}`);

            if (error instanceof BadRequestError) {
                return HttpResponse.BadRequest(error.message, response);
            }

            return HttpResponse.ServerError(error as string, response);
        }
    }

    updateModule = async (request: Request, response: Response) => {

        const { id } = request.params;

        const moduleRequest: ModuleRequestUpdate = request.body;

        moduleRequest.id = id;

        try {
            const data = await ModuleService.updateModule(moduleRequest);
            return HttpResponse.Send(data, response);
        } catch (error: any) {
            logger.error(`[updateModule] ${error}`);

            if (error instanceof BadRequestError) {
                return HttpResponse.BadRequest(error.message, response);
            }

            return HttpResponse.ServerError(error as string, response);
        }
    }

    //TODO - Implementar o delete
}