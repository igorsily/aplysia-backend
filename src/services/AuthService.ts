import database from '@config/database';
import { BadRequestError } from '@error/BadRequestError';
import { UserLoginResponse } from '@models/user/UserLoginResponse';
import { UserRequestLogin } from '@models/user/UserRequestLogin';
import { User } from '@prisma/client';
import { compare, hash as bHash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export default new class AuthService {

    login = async (userRequestLogin: UserRequestLogin): Promise<UserLoginResponse> => {

        const user: User = await database.user.findFirst({
            where: {
                email: userRequestLogin.email
            },
            include: {
                company: true,
                profile: true,
                department: true,
                unity: true,
            }
        });

        if (!user || !user.active || user.deleted) {
            throw new BadRequestError('Credenciais inválidas');
        }

        const isPassword = await this.checkPassword(userRequestLogin.password, user.password);

        if (!isPassword) {
            throw new BadRequestError('Senha incorreta');
        }

        let profile = null;

        if (user.profileId) {
            profile = await database.profile.findUnique({
                where: {
                    id: user.profileId
                },
                include: {
                    moduleProfile: {
                        include: {
                            module: true
                        }
                    }
                }
            });

            const papers = profile.moduleProfile.map(mp => {
                return {
                    module: mp.module.name,
                    permission: mp.permission.split('').map(p => Number(p))
                }
            });

            profile = {
                id: profile.id,
                name: profile.name,
                papers
            }
        }

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            profileId: user.profileId,
            companyId: user.companyId,
            departmentId: user.departmentId,
            unityId: user.unityId,
            profile
        }

        const token = sign(
            payload,
            process.env.JWT_SECRET,
            {
                subject: String(user.id),
                expiresIn: process.env.JWT_EXPIRES_IN,
            },
        );

        const userLoginResponse: UserLoginResponse = {
            token,
            name: user.name
        }

        return userLoginResponse;

    }

    generatePassword = async (password?: string): Promise<{ hash: string, password: string }> => {

        password = password ? password : Math.random().toString(36).slice(-8);

        const hash = await bHash(password, 8);

        return { hash, password };
    }

    checkPassword = async (password: string, hash: string): Promise<boolean> => {

        const isPassword = await compare(password, hash);

        return isPassword;

    }
}