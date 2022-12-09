import { FilterRequest } from '@models/DTOs/filterRequest';

export interface ModuleRequestList extends FilterRequest {
    filter: string
}