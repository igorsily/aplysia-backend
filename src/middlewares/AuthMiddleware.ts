import { User } from '@prisma/client';
import UserService from '@service/UserService';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export default new class AuthMiddleware {

    async verifyToken(request: Request, response: Response, next: NextFunction) {
        const authorization = request.headers['authorization'] as string;

        if (!authorization) {
            return response.status(403).send({ message: 'No token provided!' });
        }

        const [, token] = authorization.split(' ');

        const decoded: any = verify(token, process.env.JWT_SECRET as string);

        const { id } = decoded;

        const user: User = await UserService.findUnique(id);

        if (!user || user.deleted) {
            return response.status(401).json({ message: 'Token inválido!' });
        }


        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        request.user = {
            id
        }

        return next();

    }

}