
export interface ResponseList<T> {
    data: T[]
    count: number,
    pageSize: number,
    page: number
}