export class PagedListResponse<Type> {
	items: Type[];
	pagingInformation: PagingInformation;
}

class PagingInformation {
	totalCount: number;
	totalPages: number;
	currentPage: number;
	pageSize: number;
	hasPrevious: false;
	hasNext: false;
}