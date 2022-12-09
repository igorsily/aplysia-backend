import { logger } from '@config/logger';
import { BadRequestError } from '@error/BadRequestError';
import HttpResponse from '@helpers/httpResponse';
import { UserRequestCreate } from '@models/user/UserRequestCreate';
import { UserRequestList } from '@models/user/UserRequestList';
import { UserRequestUpdate } from '@models/user/UserRequestUpdate';
import UserService from '@service/UserService';

import { Request, Response } from 'express';

export default new class UserController {

    listAllUsers = async (request: Request, response: Response) => {

        const { filter, pageSize, page } = request.query;

        const limit: number | any = pageSize ? pageSize : 10;
        const offset = page ? (parseInt(page as string) - 1) * limit : 0;

        const userRequestList: UserRequestList = {
            filter: filter ? filter as string : null,
            limit: limit,
            offset: offset
        }

        try {
            const data = await UserService.listAllUsers(userRequestList);
            return HttpResponse.Send(data, response);
        } catch (error: any) {
            logger.error(`[listAllUsers] ${error}`);
            return HttpResponse.ServerError(error as string, response);
        }

    }

    createUser = async (request: Request, response: Response) => {

        const userRequestCreate: UserRequestCreate = request.body;

        try {
            const data = await UserService.createUser(userRequestCreate)
            return HttpResponse.Created(data, response);
        } catch (error: any) {
            logger.error(`[createUser] ${error}`);

            if (error instanceof BadRequestError) {
                return HttpResponse.BadRequest(error.message, response);
            }

            return HttpResponse.ServerError(error as string, response);
        }
    }

    getUserById = async (request: Request, response: Response) => {

        const { id } = request.params;

        try {
            const data = await UserService.getUserById(id);
            return HttpResponse.Send(data, response);
        } catch (error: any) {
            logger.error(`[getUserById] ${error}`);

            if (error instanceof BadRequestError) {
                return HttpResponse.BadRequest(error.message, response);
            }

            return HttpResponse.ServerError(error as string, response);
        }
    }

    updateUser = async (request: Request, response: Response) => {

        const { id } = request.params;

        const userRequest: UserRequestUpdate = request.body;

        userRequest.id = id;

        try {
            const data = await UserService.updateUser(userRequest);
            return HttpResponse.Send(data, response);
        } catch (error: any) {
            logger.error(`[updateUser] ${error}`);

            if (error instanceof BadRequestError) {
                return HttpResponse.BadRequest(error.message, response);
            }

            return HttpResponse.ServerError(error as string, response);
        }
    }

    //TODO - Implementar o delete
}