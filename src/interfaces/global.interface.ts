export interface QueryParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    name?: string;
  }

  export interface Pagination {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
}
  


