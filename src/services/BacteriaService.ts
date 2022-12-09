import database from '@config/database';
import { BadRequestError } from '@error/BadRequestError';
import { BacteriumRequestCreate } from '@models/BacteriumRequestCreate';
import { BacteriumRequestUpdate } from '@models/BacteriumRequestUpdate';
import { BacteriaRequestList } from '@models/DTOs/bacteriaRequestList';
import { ResponseList } from '@models/ResponseList';
import { Bacterium, Prisma } from '@prisma/client';
import FileUtils from '@utils/FileUtils';
import GoogleCloudService from './GoogleCloudService';

export default new class BacteriaService {

    listAllBacteria = async (bacteriaRequestList: BacteriaRequestList): Promise<ResponseList<Bacterium>> => {

        const querySelect = `SELECT * FROM bacteria ${bacteriaRequestList.name ? `WHERE name LIKE '%${bacteriaRequestList.name}%'` : ''} LIMIT ${bacteriaRequestList.limit} OFFSET ${bacteriaRequestList.offset}`


        const data = await database.$transaction([
            database.bacterium.count(),
            database.$queryRaw<Bacterium[]>(
                Prisma.raw(querySelect)
            )
        ]);

        const response: ResponseList<Bacterium> = {
            data: data[1],
            count: data[0],
            pageSize: bacteriaRequestList.limit,
            page: bacteriaRequestList.offset
        }

        return response;


    }

    createBacterium = async (bacteriumRequest: BacteriumRequestCreate): Promise<Bacterium> => {

        const bacterium: Bacterium = await database.bacterium.findFirst({
            where: {
                name: bacteriumRequest.name
            }
        });

        if (bacterium) {

            throw new BadRequestError('Bacteria já cadastrada no sistema com esse nome');

        }

        bacteriumRequest.image.originalname = FileUtils.renameFile(bacteriumRequest.image.originalname);

        const imageName = await GoogleCloudService.uploadFile(bacteriumRequest.image);

        const bacteriumCreated: Bacterium = await database.bacterium.create({
            data: {
                name: bacteriumRequest.name,
                fictitiousName: bacteriumRequest.fictitiousName,
                description: bacteriumRequest.description,
                image: imageName
            }
        });

        return bacteriumCreated;
    }

    getBacteriumById = async (id: string): Promise<Bacterium> => {


        const bacterium: Bacterium = await this.findUnique(id);

        if (!bacterium) {
            throw new BadRequestError('Bacteria não encontrada no sistema com esse id informado');
        }

        if (bacterium.image) {
            const imageUrl = await GoogleCloudService.getUrlFile(bacterium.image);

            bacterium.image = imageUrl;
        }

        return bacterium;
    }

    updateBacterium = async (bacteriumRequest: BacteriumRequestUpdate): Promise<Bacterium> => {


        const bacterium: Bacterium = await this.findUnique(bacteriumRequest.id);

        if (!bacterium) {
            throw new BadRequestError('Bacteria não encontrada no sistema com esse id informado');
        }


        Object.keys(bacteriumRequest).forEach(key => !bacteriumRequest[key] ? delete bacteriumRequest[key] : {});

        let imageName: string;
        const data: any = {
            ...bacteriumRequest
        };

        if (bacteriumRequest.image) {

            if (bacterium.image) {
                await GoogleCloudService.deleteFile(bacterium.image);
            }


            bacteriumRequest.image.originalname = FileUtils.renameFile(bacteriumRequest.image.originalname);

            imageName = await GoogleCloudService.uploadFile(bacteriumRequest.image);

            data.image = imageName;
        }



        const bacteriumUpdate = await database.bacterium.update({
            where: {
                id: bacteriumRequest.id
            },
            data
        })

        return bacteriumUpdate;
    }

    findUnique = async (id: string): Promise<Bacterium> => {

        const bacterium: Bacterium = await database.bacterium.findUnique({
            where: {
                id
            }
        });

        return bacterium;
    }
}