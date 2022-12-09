import { logger } from '@config/logger';
import { BadRequestError } from '@error/BadRequestError';
import HttpResponse from '@helpers/httpResponse';
import { UnityRequestCreate } from '@models/unity/UnityRequestCreate';
import { UnityRequestList } from '@models/unity/UnityRequestList';
import { UnityRequestUpdate } from '@models/unity/UnityRequestUpdate';
import UnityService from '@service/UnityService';

import { Request, Response } from 'express';

export default new class UnityController {

    listAllUnitys = async (request: Request, response: Response) => {

        const { companyId, fantasyName, pageSize, page } = request.query;

        const limit: number | any = pageSize ? pageSize : 10;
        const offset = page ? (parseInt(page as string) - 1) * limit : 0;

        const unityRequestList: UnityRequestList = {
            companyId: companyId as string,
            fantasyName: fantasyName as string,
            limit: limit,
            offset: offset
        }

        try {
            const data = await UnityService.listAllUnitys(unityRequestList);
            return HttpResponse.Send(data, response);
        } catch (error: any) {
            logger.error(`[listAllUnitys] ${error}`);
            return HttpResponse.ServerError(error as string, response);
        }

    }

    createUnity = async (request: Request, response: Response) => {

        const unityRequestCreate: UnityRequestCreate = request.body;

        try {
            const data = await UnityService.createUnity(unityRequestCreate)
            return HttpResponse.Created(data, response);
        } catch (error: any) {
            logger.error(`[createUnity] ${error}`);

            if (error instanceof BadRequestError) {
                return HttpResponse.BadRequest(error.message, response);
            }

            return HttpResponse.ServerError(error as string, response);
        }
    }

    getUnityById = async (request: Request, response: Response) => {

        const { id } = request.params;

        try {
            const data = await UnityService.getUnityById(id);
            return HttpResponse.Send(data, response);
        } catch (error: any) {
            logger.error(`[getUnityById] ${error}`);

            if (error instanceof BadRequestError) {
                return HttpResponse.BadRequest(error.message, response);
            }

            return HttpResponse.ServerError(error as string, response);
        }
    }

    updateUnity = async (request: Request, response: Response) => {

        const { id } = request.params;

        const unityRequest: UnityRequestUpdate = request.body;

        unityRequest.id = id;

        try {
            const data = await UnityService.updateUnity(unityRequest);
            return HttpResponse.Send(data, response);
        } catch (error: any) {
            logger.error(`[updateUnity] ${error}`);

            if (error instanceof BadRequestError) {
                return HttpResponse.BadRequest(error.message, response);
            }

            return HttpResponse.ServerError(error as string, response);
        }
    }

    //TODO - Implementar o delete
}