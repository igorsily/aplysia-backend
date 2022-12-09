import { Base } from './base';

export interface Company extends Base {
    socialReason: string;
    fantasyName?: string;
    document?: string;
}