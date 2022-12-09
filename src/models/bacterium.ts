import { Base } from './base';

export interface Bacterium extends Base{
    id: string,
    name: string,
    fictitiousName: string,
    description: string,
    image: string,
    createdAt: Date,
    updatedAt: Date
}