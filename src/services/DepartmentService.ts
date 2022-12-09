import database from '@config/database';
import { BadRequestError } from '@error/BadRequestError';
import { DepartmentRequestCreate } from '@models/department/DepartmentRequestCreate';

import { DepartmentRequestList } from '@models/department/DepartmentRequestList';
import { DepartmentRequestUpdate } from '@models/department/DepartmentRequestUpdate';
import { ResponseList } from '@models/ResponseList';
import { Department, Prisma } from '@prisma/client';

export default new class DepartmentService {

    listAllDepartments = async (departmentRequestList: DepartmentRequestList): Promise<ResponseList<Department>> => {

        const querySelect = `
        SELECT * FROM units 
        ${departmentRequestList.companyId ? ` WHERE company_id = '${departmentRequestList.companyId}' AND ` : ''}
        ${departmentRequestList.fantasyName ?
                `${departmentRequestList.companyId ?
                    `fantasy_name LIKE '%${departmentRequestList.fantasyName}%'` : ` WHERE fantasy_name LIKE '%${departmentRequestList.fantasyName}%'`}`
                : ''}

         LIMIT ${departmentRequestList.limit} OFFSET ${departmentRequestList.offset}`


        const data = await database.$transaction([
            database.department.count(),
            database.$queryRaw<Department[]>(
                Prisma.raw(querySelect)
            )
        ]);

        const response: ResponseList<Department> = {
            data: data[1],
            count: data[0],
            pageSize: departmentRequestList.limit,
            page: departmentRequestList.offset
        }

        return response;


    }

    createDepartment = async (departmentRequest: DepartmentRequestCreate): Promise<Department> => {


        //TODO Excluir o PROEJTO e JOGAR TUDO PRO DEPARTAMENTO NOME DO PROJETO UNICO
        const department: Department = await database.department.findFirst({
            where: {
                fantasyName: departmentRequest.fantasyName
            }
        });

        if (department) {

            throw new BadRequestError('Department já cadastrada no sistema com esse nome informada');

        }


        const departmentCreated: Department = await database.$transaction(async (tx) => {
            const departmentCreated: Department = await tx.department.create({
                data: {
                    unityId: departmentRequest.unityId,
                    fantasyName: departmentRequest.fantasyName,
                    responsible: departmentRequest.responsible,
                    description: departmentRequest.description,
                }
            });

            if (!departmentCreated) {
                throw new BadRequestError('Erro ao criar Department');
            }

            await tx.project.create({
                data: {
                    departmentId: departmentCreated.id,
                    name: departmentRequest.projectName,
                    startDate: departmentRequest.startDate,
                    endDate: departmentRequest.endDate,
                }
            })

            return departmentCreated;

        })

        return departmentCreated;
    }

    getDepartmentById = async (id: string): Promise<Department> => {


        const department: Department = await this.findUnique(id, { project: true });

        if (!department) {
            throw new BadRequestError('Department não encontrada no sistema com esse id informado');
        }


        return department;
    }

    updateDepartment = async (departmentRequest: DepartmentRequestUpdate): Promise<Department> => {


        const department: Department = await this.findUnique(departmentRequest.id);

        if (!department) {
            throw new BadRequestError('Department não encontrada no sistema com esse id informado');
        }


        Object.keys(departmentRequest).forEach(key => !departmentRequest[key] ? delete departmentRequest[key] : {});


        const departmentUpdate = await database.department.update({
            where: {
                id: departmentRequest.id
            },
            data: {
                ...departmentRequest
            }
        })

        return departmentUpdate;
    }

    findUnique = async (id: string, include?: Record<string, any>): Promise<Department> => {

        const department: Department = await database.department.findUnique({
            where: {
                id
            },
            include
        });

        return department;
    }
}