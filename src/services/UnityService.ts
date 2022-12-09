import database from '@config/database';
import { BadRequestError } from '@error/BadRequestError';
import { UnityRequestCreate } from '@models/unity/UnityRequestCreate';

import { ResponseList } from '@models/ResponseList';
import { UnityRequestList } from '@models/unity/UnityRequestList';
import { UnityRequestUpdate } from '@models/unity/UnityRequestUpdate';
import { Prisma, Unity } from '@prisma/client';

export default new class UnityService {

    listAllUnitys = async (unityRequestList: UnityRequestList): Promise<ResponseList<Unity>> => {

        const querySelect = `
        SELECT * FROM units 
        ${unityRequestList.companyId ? ` WHERE company_id = '${unityRequestList.companyId}' AND ` : ''}
        ${unityRequestList.fantasyName ?
                `${unityRequestList.companyId ?
                    `fantasy_name LIKE '%${unityRequestList.fantasyName}%'` : ` WHERE fantasy_name LIKE '%${unityRequestList.fantasyName}%'`}`
                : ''}

         LIMIT ${unityRequestList.limit} OFFSET ${unityRequestList.offset}`


        const data = await database.$transaction([
            database.unity.count(),
            database.$queryRaw<Unity[]>(
                Prisma.raw(querySelect)
            )
        ]);

        const response: ResponseList<Unity> = {
            data: data[1],
            count: data[0],
            pageSize: unityRequestList.limit,
            page: unityRequestList.offset
        }

        return response;


    }

    createUnity = async (unityRequest: UnityRequestCreate): Promise<Unity> => {

        // const unity: Unity = await database.unity.findFirst({
        //     where: {
        //         socialReason: unityRequest.socialReason
        //     }
        // });

        // if (unity) {

        //     throw new BadRequestError('Unity já cadastrada no sistema com essa razão social informada');

        // }


        const unityCreated: Unity = await database.unity.create({
            data: {
                ...unityRequest
            }
        });

        return unityCreated;
    }

    getUnityById = async (id: string): Promise<Unity> => {


        const unity: Unity = await this.findUnique(id);

        if (!unity) {
            throw new BadRequestError('Unity não encontrada no sistema com esse id informado');
        }


        return unity;
    }

    updateUnity = async (unityRequest: UnityRequestUpdate): Promise<Unity> => {


        const unity: Unity = await this.findUnique(unityRequest.id);

        if (!unity) {
            throw new BadRequestError('Unity não encontrada no sistema com esse id informado');
        }


        Object.keys(unityRequest).forEach(key => !unityRequest[key] ? delete unityRequest[key] : {});


        const unityUpdate = await database.unity.update({
            where: {
                id: unityRequest.id
            },
            data: {
                ...unityRequest
            }
        })

        return unityUpdate;
    }

    findUnique = async (id: string): Promise<Unity> => {

        const unity: Unity = await database.unity.findUnique({
            where: {
                id
            }
        });

        return unity;
    }
}