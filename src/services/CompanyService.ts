import database from '@config/database';
import { BadRequestError } from '@error/BadRequestError';
import { CompanyRequestCreate } from '@models/company/CompanyRequestCreate';

import { CompanyRequestList } from '@models/company/CompanyRequestList';
import { CompanyRequestUpdate } from '@models/company/CompanyRequestUpdate';
import { ResponseList } from '@models/ResponseList';
import { Company, Prisma } from '@prisma/client';

export default new class CompanyService {

    listAllCompanies = async (companyRequestList: CompanyRequestList): Promise<ResponseList<Company>> => {

        const querySelect = `SELECT * FROM companies ${companyRequestList.filter ? `WHERE social_reason LIKE '%${companyRequestList.filter}%'` : ''} LIMIT ${companyRequestList.limit} OFFSET ${companyRequestList.offset}`


        const data = await database.$transaction([
            database.company.count(),
            database.$queryRaw<Company[]>(
                Prisma.raw(querySelect)
            )
        ]);

        const response: ResponseList<Company> = {
            data: data[1],
            count: data[0],
            pageSize: companyRequestList.limit,
            page: companyRequestList.offset
        }

        return response;


    }

    createCompany = async (companyRequest: CompanyRequestCreate): Promise<Company> => {

        const company: Company = await database.company.findFirst({
            where: {
                socialReason: companyRequest.socialReason
            }
        });

        if (company) {

            throw new BadRequestError('Company já cadastrada no sistema com essa Razão Social');

        }


        const companyCreated: Company = await database.company.create({
            data: {
                ...companyRequest
            }
        });

        return companyCreated;
    }

    getCompanyById = async (id: string): Promise<Company> => {


        const company: Company = await this.findUnique(id);

        if (!company) {
            throw new BadRequestError('Company não encontrada no sistema com esse id informado');
        }


        return company;
    }

    updateCompany = async (companyRequest: CompanyRequestUpdate): Promise<Company> => {


        const company: Company = await this.findUnique(companyRequest.id);

        if (!company) {
            throw new BadRequestError('Company não encontrada no sistema com esse id informado');
        }


        Object.keys(companyRequest).forEach(key => !companyRequest[key] ? delete companyRequest[key] : {});


        const companyUpdate = await database.company.update({
            where: {
                id: companyRequest.id
            },
            data: {
                ...companyRequest
            }
        })

        return companyUpdate;
    }

    findUnique = async (id: string): Promise<Company> => {

        const company: Company = await database.company.findUnique({
            where: {
                id
            }
        });

        return company;
    }
}