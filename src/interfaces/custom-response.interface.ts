export interface CustomResponse<T> {
    success: boolean;
    data: T;
    errors?: string[];
}