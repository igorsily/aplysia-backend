import database from '@config/database';
import { BadRequestError } from '@error/BadRequestError';
import { UserRequestCreate } from '@models/user/UserRequestCreate';

import { ResponseList } from '@models/ResponseList';
import { UserRequestList } from '@models/user/UserRequestList';
import { UserRequestUpdate } from '@models/user/UserRequestUpdate';
import { Prisma, User } from '@prisma/client';
import AuthService from './AuthService';
import MailService from './MailService';

export default new class UserService {

    listAllUsers = async (userRequestList: UserRequestList): Promise<ResponseList<User>> => {

        const querySelect = `SELECT * FROM users ${userRequestList.filter ? `WHERE name LIKE '%${userRequestList.filter}%'` : ''} LIMIT ${userRequestList.limit} OFFSET ${userRequestList.offset}`


        const data = await database.$transaction([
            database.user.count(),
            database.$queryRaw<User[]>(
                Prisma.raw(querySelect)
            )
        ]);

        const response: ResponseList<User> = {
            data: data[1],
            count: data[0],
            pageSize: userRequestList.limit,
            page: userRequestList.offset
        }

        return response;


    }

    createUser = async (userRequest: UserRequestCreate): Promise<User> => {

        const user: User = await database.user.findFirst({
            where: {
                email: userRequest.email
            }
        });

        if (user) {

            throw new BadRequestError('User já cadastrada no sistema com esse email');

        }

        const { hash, password } = await AuthService.generatePassword();

        const userCreated: User = await database.user.create({
            data: {
                ...userRequest,
                password: hash
            }
        });

        const mailService = new MailService();

        mailService.sendMailWithTo(
            userRequest.email,
            'Bem vindo!',
            'wellcome',
            {
                nome: userRequest.name,
                senha: password,
                email: userRequest.email
            }
        )

        return userCreated;
    }

    getUserById = async (id: string): Promise<User> => {


        const user: User = await this.findUnique(id);

        if (!user) {
            throw new BadRequestError('User não encontrada no sistema com esse id informado');
        }


        return user;
    }

    updateUser = async (userRequest: UserRequestUpdate): Promise<User> => {


        const user: User = await this.findUnique(userRequest.id);

        if (!user) {
            throw new BadRequestError('User não encontrada no sistema com esse id informado');
        }


        Object.keys(userRequest).forEach(key => !userRequest[key] ? delete userRequest[key] : {});


        const userUpdate = await database.user.update({
            where: {
                id: userRequest.id
            },
            data: {
                ...userRequest
            }
        })

        return userUpdate;
    }

    findUnique = async (id: string): Promise<User> => {

        const user: User = await database.user.findUnique({
            where: {
                id
            }
        });

        return user;
    }

    // alterPassword = async (id: string, password: string): Promise<User> => {


    //     return null;
    // }
}