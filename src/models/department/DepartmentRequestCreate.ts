export interface DepartmentRequestCreate {
    unityId: string;
    responsible: string;
    fantasyName: string;
    projectName: string;
    startDate: Date;
    endDate: Date;
    description?: string;
}