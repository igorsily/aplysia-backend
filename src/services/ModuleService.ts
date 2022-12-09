import database from '@config/database';
import { BadRequestError } from '@error/BadRequestError';
import { ModuleRequestCreate } from '@models/module/ModuleRequestCreate';

import { ModuleRequestList } from '@models/module/ModuleRequestList';
import { ModuleRequestUpdate } from '@models/module/ModuleRequestUpdate';
import { ResponseList } from '@models/ResponseList';
import { Module, Prisma } from '@prisma/client';

export default new class ModuleService {

    listAllModules = async (moduleRequestList: ModuleRequestList): Promise<ResponseList<Module>> => {

        const querySelect = `SELECT * FROM modules ${moduleRequestList.filter ? `WHERE name LIKE '%${moduleRequestList.filter}%'` : ''} LIMIT ${moduleRequestList.limit} OFFSET ${moduleRequestList.offset}`


        const data = await database.$transaction([
            database.module.count(),
            database.$queryRaw<Module[]>(
                Prisma.raw(querySelect)
            )
        ]);

        const response: ResponseList<Module> = {
            data: data[1],
            count: data[0],
            pageSize: moduleRequestList.limit,
            page: moduleRequestList.offset
        }

        return response;


    }

    createModule = async (moduleRequest: ModuleRequestCreate): Promise<Module> => {

        const module: Module = await database.module.findFirst({
            where: {
                name: moduleRequest.name
            }
        });

        if (module) {

            throw new BadRequestError('Module já cadastrada no sistema com essa Nome');

        }


        const moduleCreated: Module = await database.module.create({
            data: {
                ...moduleRequest
            }
        });

        return moduleCreated;
    }

    getModuleById = async (id: string): Promise<Module> => {


        const module: Module = await this.findUnique(id);

        if (!module) {
            throw new BadRequestError('Module não encontrada no sistema com esse id informado');
        }


        return module;
    }

    updateModule = async (moduleRequest: ModuleRequestUpdate): Promise<Module> => {


        const module: Module = await this.findUnique(moduleRequest.id);

        if (!module) {
            throw new BadRequestError('Module não encontrada no sistema com esse id informado');
        }


        Object.keys(moduleRequest).forEach(key => !moduleRequest[key] ? delete moduleRequest[key] : {});


        const moduleUpdate = await database.module.update({
            where: {
                id: moduleRequest.id
            },
            data: {
                ...moduleRequest
            }
        })

        return moduleUpdate;
    }

    findUnique = async (id: string): Promise<Module> => {

        const module: Module = await database.module.findUnique({
            where: {
                id
            }
        });

        return module;
    }
}