export interface BacteriumRequestCreate {
    name: string,
    fictitiousName: string,
    description: string,
    image: Express.Multer.File
}