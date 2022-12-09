import { FilterRequest } from '@models/DTOs/filterRequest';

export interface CompanyRequestList extends FilterRequest {
    filter: string
}