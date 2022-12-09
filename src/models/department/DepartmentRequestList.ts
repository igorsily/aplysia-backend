import { FilterRequest } from '@models/DTOs/filterRequest';

export interface DepartmentRequestList extends FilterRequest {
    companyId: string,
    fantasyName: string,
}