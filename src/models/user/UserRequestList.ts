import { FilterRequest } from '@models/DTOs/filterRequest';

export interface UserRequestList extends FilterRequest {
    filter: string
}