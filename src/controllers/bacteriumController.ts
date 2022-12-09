import { logger } from '@config/logger';
import { BadRequestError } from '@error/BadRequestError';
import HttpResponse from '@helpers/httpResponse';
import { BacteriumRequestCreate } from '@models/BacteriumRequestCreate';
import { BacteriumRequestUpdate } from '@models/BacteriumRequestUpdate';
import { BacteriaRequestList } from '@models/DTOs/bacteriaRequestList';
import BacteriaService from '@service/BacteriaService';

import { Request, Response } from 'express';

export default new class BacteriumController {

    listAllBacteria = async (request: Request, response: Response) => {

        const { name, pageSize, page } = request.query;

        const limit: number | any = pageSize ? pageSize : 10;
        const offset = page ? (parseInt(page as string) - 1) * limit : 0;

        const bacteriaRequestList: BacteriaRequestList = {
            name: name ? name as string : null,
            limit: limit,
            offset: offset
        }

        try {
            const data = await BacteriaService.listAllBacteria(bacteriaRequestList);
            return HttpResponse.Send(data, response);
        } catch (error: any) {
            logger.error(`[listAllBacteria] ${error}`);
            return HttpResponse.ServerError(error as string, response);
        }

    }

    createBacterium = async (request: Request, response: Response) => {

        const file: Express.Multer.File = request.file;

        const { name, fictitiousName, description } = request.body;

        const bacteriumRequestCreate: BacteriumRequestCreate = {
            name,
            fictitiousName,
            description,
            image: file
        }

        try {
            const data = await BacteriaService.createBacterium(bacteriumRequestCreate)
            return HttpResponse.Created(data, response);
        } catch (error: any) {
            logger.error(`[createBacterium] ${error}`);

            if (error instanceof BadRequestError) {
                return HttpResponse.BadRequest(error.message, response);
            }

            return HttpResponse.ServerError(error as string, response);
        }
    }

    getBacteriumById = async (request: Request, response: Response) => {

        const { id } = request.params;

        try {
            const data = await BacteriaService.getBacteriumById(id);
            return HttpResponse.Send(data, response);
        } catch (error: any) {
            logger.error(`[getBacteriumById] ${error}`);

            if (error instanceof BadRequestError) {
                return HttpResponse.BadRequest(error.message, response);
            }

            return HttpResponse.ServerError(error as string, response);
        }
    }

    updateBacterium = async (request: Request, response: Response) => {

        const { id } = request.params;

        const { name, fictitiousName, description } = request.body;

        const file: Express.Multer.File = request.file;

        const bacteriumRequest: BacteriumRequestUpdate = {
            id,
            name,
            fictitiousName,
            description,
            image: file
        }


        try {
            const data = await BacteriaService.updateBacterium(bacteriumRequest);
            return HttpResponse.Send(data, response);
        } catch (error: any) {
            logger.error(`[updateBacterium] ${error}`);

            if (error instanceof BadRequestError) {
                return HttpResponse.BadRequest(error.message, response);
            }
            
            return HttpResponse.ServerError(error as string, response);
        }
    }

    //TODO - Implementar o delete
}