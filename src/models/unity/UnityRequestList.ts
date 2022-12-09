import { FilterRequest } from '@models/DTOs/filterRequest';

export interface UnityRequestList extends FilterRequest {
    companyId: string,
    fantasyName: string,
}