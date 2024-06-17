export interface Article {
    _id: string;
    name: string;
    price: DecimalValue;
    description: string;
    quantity: DecimalValue;
    notes: string[];
  }
export interface DecimalValue {
    $numberDecimal: string;
}

export interface CreateArticle {
    name: string;
    price: number;
    description: string;
    quantity: number;
    notes: string[];

}

export interface Pagination {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
}
  
export interface ArticleData {
    data: Article[];
    pagination: Pagination;
}

export interface SearchParams {
    name: string;
}



export interface EditArticle {
    name?: string;
    price?: DecimalValue;
    description?: string;
    quantity?: DecimalValue;
    notes?: string[];
}