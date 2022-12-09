export interface BacteriumRequestUpdate {
    id?: string,
    name?: string,
    fictitiousName?: string,
    description?: string,
    image?: Express.Multer.File
}