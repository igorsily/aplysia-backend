import { logger } from '@config/logger';
import { BadRequestError } from '@error/BadRequestError';
import HttpResponse from '@helpers/httpResponse';
import { UserRequestLogin } from '@models/user/UserRequestLogin';
import AuthService from '@service/AuthService';

import { Request, Response } from 'express';

export default new class AuthController {

    login = async (request: Request, response: Response) => {

        const authRequest: UserRequestLogin = request.body;

        try {
            const data = await AuthService.login(authRequest);
            return HttpResponse.Send(data, response);
        } catch (error: any) {
            logger.error(`[login] ${error}`);

            if (error instanceof BadRequestError) {
                return HttpResponse.BadRequest(error.message, response);
            }

            return HttpResponse.ServerError(error as string, response);
        }

    }



}