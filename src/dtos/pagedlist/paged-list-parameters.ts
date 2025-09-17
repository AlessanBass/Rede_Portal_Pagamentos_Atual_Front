export class PagedListParameters {
    currentPage?: number = 1;
    pageSize?: number = 10;
    sort?: string = "";
    order?: PaginationSortOptions = "desc";
}